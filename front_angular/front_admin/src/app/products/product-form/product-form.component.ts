import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  form: FormGroup;

  submitted = false;

  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | '' = '';

  editMode = false;
  productId!: number;

  sizeMap: any = {
    men: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    women: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    kids: ['1Y', '2Y', '3Y', '4Y', '5Y', '6Y', '7Y', '8Y', '9Y', '10Y', '11Y', '12Y', '13Y', '14Y', '15Y', '16Y']
  };

  availableSizes: string[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      category: ['', Validators.required],
      description: [''],
      variants: this.fb.array([])
    });
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.editMode = true;

      this.productId = +id;

      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number) {

    const product = this.productService.getProductById(id);

    if (!product) return;

    // basic
    this.form.patchValue({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description
    });

    this.availableSizes = this.sizeMap[product.category] || [];

    // variants
    this.variants.clear();

    product.variants.forEach((v: any) => {

      const variantGroup = this.fb.group({
        colorName: [v.colorName],
        colorValue: [v.colorValue],
        images: this.fb.array([]),
        sizes: this.fb.array([])
      });

      // images
      v.images.forEach((img: string) => {
        (variantGroup.get('images') as FormArray)
          .push(this.fb.control(img));
      });

      // sizes
      v.sizes.forEach((s: any) => {

        (variantGroup.get('sizes') as FormArray)
          .push(this.fb.group({
            size: [s.size],
            stock: [s.stock]
          }));
      });

      this.variants.push(variantGroup);
    });
  }

  getCategoryLabel(category: string): string {

    switch (category) {

      case 'men':
        return 'Homme';

      case 'women':
        return 'Femme';

      case 'kids':
        return 'Enfants';

      default:
        return category;
    }
  }

  goToList() {
    this.router.navigate(['/product-list']);
  }

  // ================= HELPERS =================

  isInvalid(control: any): boolean {
    return control && control.invalid && (control.touched || this.submitted);
  }

  // ================= CATEGORY =================

  onCategoryChange(event: Event) {
    const category = (event.target as HTMLSelectElement).value;

    this.availableSizes = this.sizeMap[category] || [];

    this.variants.clear();
    this.addVariant();
  }

  // ================= FORM ARRAY =================

  get variants(): FormArray {
    return this.form.get('variants') as FormArray;
  }

  createVariant(): FormGroup {
    return this.fb.group({
      colorName: ['', Validators.required],
      colorValue: ['#000000'],
      images: this.fb.array([]),
      sizes: this.fb.array([this.createSize()])
    });
  }

  createSize(): FormGroup {
    return this.fb.group({
      size: ['', Validators.required],
      stock: [null, [Validators.required, Validators.min(1)]]
    });
  }

  getSizes(i: number): FormArray {
    return this.variants.at(i).get('sizes') as FormArray;
  }

  getVariantImages(i: number): FormArray {
    return this.variants.at(i).get('images') as FormArray;
  }

  // ================= ACTIONS =================

  addVariant() {
    if (!this.availableSizes.length) {
      this.showAlert("Sélectionnez d'abord la catégorie", 'warning');
      return;
    }

    this.variants.push(this.createVariant());
  }

  removeVariant(i: number) {
    this.variants.removeAt(i);
  }

  addSize(i: number) {
    this.getSizes(i).push(this.createSize());
  }

  removeSize(i: number, j: number) {
    this.getSizes(i).removeAt(j);
  }

  getAvailableSizesForVariant(variantIndex: number, currentSize: string): string[] {
    const usedSizes = this.getSizes(variantIndex).value
      .map((s: any) => s.size)
      .filter((s: string) => s && s !== currentSize);

    return this.availableSizes.filter(s => !usedSizes.includes(s));
  }

  canAddSize(variantIndex: number): boolean {
    const available = this.getAvailableSizesForVariant(variantIndex, '');
    return available.length > 0;
  }

  // ================= IMAGES =================

  onVariantImageSelect(event: any, i: number) {
    const files = event.target.files;

    for (let file of files) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.getVariantImages(i).push(
          this.fb.control(e.target.result)
        );
      };

      reader.readAsDataURL(file);
    }
  }

  removeVariantImage(i: number, j: number) {
    this.getVariantImages(i).removeAt(j);
  }

  // ================= VALIDATION =================

  isValidProduct(): boolean {
    const variants = this.variants.value;

    return variants.length > 0 &&
      variants.every((v: any) =>
        v.colorName &&
        v.images?.length > 0 &&
        v.sizes?.length > 0 &&
        v.sizes.some((s: any) => s.size && s.stock > 0)
      );
  }

  // ================= SAVE =================

  addProduct() {

    this.submitted = true;
    this.form.markAllAsTouched();

    // ===== BASIC VALIDATION =====
    if (!this.form.get('name')?.value) {
      this.showAlert(' Le nom du produit est requis.', 'error');
      return;
    }

    if (!this.form.get('price')?.value) {
      this.showAlert(' Le prix est requis', 'error');
      return;
    }

    if (!this.form.get('category')?.value) {
      this.showAlert(' Veuillez sélectionner une catégorie', 'error');
      return;
    }

    // ===== VARIANTS =====
    if (!this.variants.length) {
      this.showAlert(' Ajoutez au moins une variante', 'error');
      return;
    }

    for (let i = 0; i < this.variants.length; i++) {

      const v = this.variants.at(i).value;

      if (!v.colorName) {
        this.showAlert(`variante ${i + 1}: La couleur est requise `, 'error');
        return;
      }

      if (!v.images || v.images.length === 0) {
        this.showAlert(` variante${i + 1}: Ajouter au moins une image`, 'error');
        return;
      }

      for (let j = 0; j < v.sizes.length; j++) {

        const s = v.sizes[j];

        if (!s.size) {
          this.showAlert(` Variante ${i + 1}: choisir la taille`, 'error');
          return;
        }

        if (!s.stock || s.stock <= 0) {
          this.showAlert(` Variante ${i + 1}: stock must be > 0`, 'error');
          return;
        }
      }
    }

    // ===== SAVE / UPDATE =====

    const productData = {
      ...this.form.value,
      id: this.productId
    };

    if (this.editMode) {

      this.productService.updateProduct(productData)
        .subscribe(() => {

          this.showAlert('Produit mis à jour avec succès', 'success');

          setTimeout(() => {
            this.router.navigate(['/product-list']);
          }, 1000);

        });

    } else {

      this.productService.addProduct(this.form.value)
        .subscribe(() => {

          this.showAlert('Produit enregistré avec succès', 'success');

          this.form.reset();
          this.variants.clear();
          this.availableSizes = [];
          this.submitted = false;

        });
    }
  }

  // ================= RESET =================

  resetForm() {
    this.form.reset();
    this.variants.clear();
    this.availableSizes = [];
    this.submitted = false;
  }

  // ================= ALERT =================

  showAlert(message: string, type: 'success' | 'error' | 'warning') {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => this.closeAlert(), 4000);
  }

  closeAlert() {
    this.alertMessage = '';
    this.alertType = '';
  }

  selectCategory(category: string) {

    this.form.patchValue({
      category: category
    });

    this.availableSizes = this.sizeMap[category] || [];

    this.variants.controls.forEach((variant: any) => {

      const sizes = variant.get('sizes') as FormArray;

      sizes.clear();

      sizes.push(
        this.fb.group({
          size: [''],
          stock: [null]
        })
      );

    });

    if (this.variants.length === 0) {
      this.addVariant();
    }
  }

  selectSize(variantIndex: number, sizeIndex: number, size: string) {

    this.getSizes(variantIndex)
      .at(sizeIndex)
      .patchValue({
        size: size
      });
  }

  selectedImage: string | null = null;

  openImage(img: string) {
    this.selectedImage = img;
  }

  closeImage() {
    this.selectedImage = null;
  }
}