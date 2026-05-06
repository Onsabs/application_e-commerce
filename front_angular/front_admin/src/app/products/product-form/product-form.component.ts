import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {

  form: FormGroup;

  submitted = false;

  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | '' = '';

  sizeMap: any = {
    men: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    women: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    kids: ['2Y', '4Y', '6Y', '8Y']
  };

  availableSizes: string[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      category: ['', Validators.required],
      description: [''],
      variants: this.fb.array([])
    });
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
      this.showAlert('Select category first', 'warning');
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
      this.showAlert(' Product name is required', 'error');
      return;
    }

    if (!this.form.get('price')?.value) {
      this.showAlert(' Price is required', 'error');
      return;
    }

    if (!this.form.get('category')?.value) {
      this.showAlert(' Please select a category', 'error');
      return;
    }

    // ===== VARIANTS =====
    if (!this.variants.length) {
      this.showAlert(' Add at least one variant', 'error');
      return;
    }

    for (let i = 0; i < this.variants.length; i++) {

      const v = this.variants.at(i).value;

      if (!v.colorName) {
        this.showAlert(` Variant ${i + 1}: color is required`, 'error');
        return;
      }

      if (!v.images || v.images.length === 0) {
        this.showAlert(` Variant ${i + 1}: add at least one image`, 'error');
        return;
      }

      if (!v.sizes || v.sizes.length === 0) {
        this.showAlert(` Variant ${i + 1}: add sizes`, 'error');
        return;
      }

      for (let j = 0; j < v.sizes.length; j++) {

        const s = v.sizes[j];

        if (!s.size) {
          this.showAlert(` Variant ${i + 1}: choose size`, 'error');
          return;
        }

        if (!s.stock || s.stock <= 0) {
          this.showAlert(` Variant ${i + 1}: stock must be > 0`, 'error');
          return;
        }
      }
    }

    // SAVE
    this.productService.addProduct(this.form.value).subscribe(() => {

      this.showAlert('Product saved successfully', 'success');

      this.form.reset();
      this.variants.clear();
      this.availableSizes = [];
      this.submitted = false;
    });
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
}