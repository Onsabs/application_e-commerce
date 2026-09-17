import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  submitted = false;

  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | '' = '';

  editMode = false;
  productId!: number;

  public IMG_BASE = 'http://localhost:8080/uploads/';

  // ============================================================
  // FILES TEMPORAIRES
  // ============================================================

  pendingImages: {
    file: File;
    preview: string;
  }[][] = [];

  // ============================================================
  // SIZES
  // ============================================================

  sizeMap: any = {
    men: [
      'XS', 'S', 'M', 'L',
      'XL', 'XXL', 'XXXL'
    ],

    women: [
      'XS', 'S', 'M', 'L',
      'XL', 'XXL', 'XXXL'
    ],

    kids: [
      '1Y', '2Y', '3Y', '4Y',
      '5Y', '6Y', '7Y', '8Y',
      '9Y', '10Y', '11Y', '12Y',
      '13Y', '14Y', '15Y', '16Y'
    ]
  };

  availableSizes: string[] = [];

  selectedImage: string | null = null;

  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.form = this.fb.group({
      name: ['', Validators.required],

      price: [
        null,
        Validators.required
      ],

      category: [
        '',
        Validators.required
      ],

      description: [''],

      variants: this.fb.array([])
    });
  }

  // ============================================================
  // INIT
  // ============================================================

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.editMode = true;

      this.productId = +id;

      this.loadProduct(this.productId);
    }
  }
  goToList(): void {
  this.router.navigate(['/product-list']);
}

  // ============================================================
  // DESTROY
  // ============================================================

  ngOnDestroy(): void {

    this.pendingImages.forEach(
      variantFiles => {

        variantFiles.forEach(item => {

          if (item.preview.startsWith('blob:')) {

            URL.revokeObjectURL(
              item.preview
            );
          }

        });

      }
    );
  }

  // ============================================================
  // LOAD PRODUCT
  // ============================================================

  loadProduct(id: number): void {

    this.productService
      .getProductById(id)
      .subscribe({

        next: (product) => {

          if (!product) {
            return;
          }

          // ================= BASIC =================

          this.form.patchValue({

            name: product.name,

            price: product.price,

            category: product.category,

            description: product.description

          });

          this.availableSizes =
            this.sizeMap[product.category] || [];

          // ================= CLEAR =================

          this.variants.clear();

          this.clearPendingImages();

          // ================= VARIANTS =================

          if (
            !product.variants ||
            !Array.isArray(product.variants)
          ) {
            return;
          }

          product.variants.forEach(
            (v: any, variantIndex: number) => {

              const variantGroup =
                this.fb.group({

                  colorName: [
                    v.colorName || '',
                    Validators.required
                  ],

                  colorValue: [
                    v.colorValue || '#000000'
                  ],

                  images:
                    this.fb.array([]),

                  sizes:
                    this.fb.array([])
                });

              // ================= EXISTING IMAGES =================

              const imagesArray =
                variantGroup.get(
                  'images'
                ) as FormArray;

              if (
                v.images &&
                Array.isArray(v.images)
              ) {

                v.images.forEach(
                  (img: string) => {

                    const filename =
                      this.normalizeImageFilename(
                        img
                      );

                    /*
                     * On garde uniquement
                     * le filename.
                     *
                     * PAS d'upload ici.
                     */
                    imagesArray.push(
                      this.fb.control(
                        filename
                      )
                    );
                  }
                );
              }

              // ================= SIZES =================

              const sizesArray =
                variantGroup.get(
                  'sizes'
                ) as FormArray;

              if (
                v.sizes &&
                Array.isArray(v.sizes)
              ) {

                v.sizes.forEach(
                  (s: any) => {

                    sizesArray.push(

                      this.fb.group({

                        size: [
                          s.size || '',
                          Validators.required
                        ],

                        stock: [
                          s.stock ?? null,
                          [
                            Validators.required,
                            Validators.min(1)
                          ]
                        ]

                      })

                    );

                  }
                );
              }

              // Si aucune taille
              if (sizesArray.length === 0) {

                sizesArray.push(
                  this.createSize()
                );
              }

              this.variants.push(
                variantGroup
              );

              /*
               * Pas encore de nouvelles images
               * pour cette variante.
               */
              this.pendingImages[
                variantIndex
              ] = [];
            }
          );

        },

        error: (error) => {

          console.error(
            'Erreur chargement produit:',
            error
          );

          this.showAlert(
            'Erreur lors du chargement du produit.',
            'error'
          );
        }

      });
  }

  // ============================================================
  // CATEGORY
  // ============================================================

  getCategoryLabel(
    category: string
  ): string {

    switch (category) {

      case 'men':
        return 'Homme';

      case 'women':
        return 'Femme';

      case 'kids':
        return 'Enfants';

      default:
        return '';
    }
  }

  selectCategory(
    category: string
  ): void {

    this.form.patchValue({
      category: category
    });

    this.availableSizes =
      this.sizeMap[category] || [];

    if (this.variants.length === 0) {

      this.addVariant();

      return;
    }

    this.variants.controls.forEach(
      (variant: any) => {

        const sizes =
          variant.get(
            'sizes'
          ) as FormArray;

        sizes.clear();

        sizes.push(
          this.createSize()
        );
      }
    );
  }

  onCategoryChange(
    event: Event
  ): void {

    const category =
      (event.target as HTMLSelectElement)
        .value;

    this.selectCategory(category);
  }

  // ============================================================
  // FORM ARRAYS
  // ============================================================

  get variants(): FormArray {

    return this.form.get(
      'variants'
    ) as FormArray;
  }

  createVariant(): FormGroup {

    return this.fb.group({

      colorName: [
        '',
        Validators.required
      ],

      colorValue: [
        '#000000'
      ],

      images:
        this.fb.array([]),

      sizes:
        this.fb.array([
          this.createSize()
        ])

    });
  }

  createSize(): FormGroup {

    return this.fb.group({

      size: [
        '',
        Validators.required
      ],

      stock: [
        null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ]

    });
  }

  getSizes(i: number): FormArray {

    return this.variants
      .at(i)
      .get('sizes') as FormArray;
  }

  getVariantImages(
    i: number
  ): FormArray {

    return this.variants
      .at(i)
      .get('images') as FormArray;
  }

  // ============================================================
  // VARIANTS
  // ============================================================

  addVariant(): void {

    if (!this.availableSizes.length) {

      this.showAlert(
        "Sélectionnez d'abord la catégorie",
        'warning'
      );

      return;
    }

    this.variants.push(
      this.createVariant()
    );

    this.pendingImages.push([]);
  }

  removeVariant(i: number): void {

    // Nettoyer les previews temporaires
    if (this.pendingImages[i]) {

      this.pendingImages[i].forEach(
        item => {

          if (
            item.preview.startsWith('blob:')
          ) {

            URL.revokeObjectURL(
              item.preview
            );
          }

        }
      );
    }

    this.pendingImages.splice(i, 1);

    this.variants.removeAt(i);
  }

  // ============================================================
  // SIZES
  // ============================================================

  addSize(i: number): void {

    if (!this.canAddSize(i)) {
      return;
    }

    this.getSizes(i).push(
      this.createSize()
    );
  }

  removeSize(
    i: number,
    j: number
  ): void {

    this.getSizes(i)
      .removeAt(j);
  }

  getAvailableSizesForVariant(
    variantIndex: number,
    currentSize: string
  ): string[] {

    const usedSizes =
      this.getSizes(variantIndex)
        .value
        .map((s: any) => s.size)
        .filter(
          (s: string) =>
            s &&
            s !== currentSize
        );

    return this.availableSizes
      .filter(
        s => !usedSizes.includes(s)
      );
  }

  canAddSize(
    variantIndex: number
  ): boolean {

    const available =
      this.getAvailableSizesForVariant(
        variantIndex,
        ''
      );

    return available.length > 0;
  }

  selectSize(
    variantIndex: number,
    sizeIndex: number,
    size: string
  ): void {

    this.getSizes(variantIndex)
      .at(sizeIndex)
      .patchValue({
        size: size
      });
  }

  // ============================================================
  // IMAGES
  // ============================================================

  getImageUrl(
    img: string | null | undefined
  ): string {

    if (!img) {
      return '';
    }

    // Preview temporaire
    if (img.startsWith('blob:')) {
      return img;
    }

    // URL complète
    if (
      img.startsWith('http://') ||
      img.startsWith('https://')
    ) {

      return img;
    }

    // /uploads/filename
    if (
      img.startsWith('/uploads/')
    ) {

      return (
        'http://localhost:8080' +
        img
      );
    }

    // uploads/filename
    if (
      img.startsWith('uploads/')
    ) {

      return (
        'http://localhost:8080/' +
        img
      );
    }

    // filename seulement
    return this.IMG_BASE + img;
  }

  // ============================================================
  // SELECT IMAGE
  // ============================================================

  onVariantImageSelect(
    event: Event,
    variantIndex: number
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;
    }

    if (
      !this.pendingImages[variantIndex]
    ) {

      this.pendingImages[
        variantIndex
      ] = [];
    }

    const imagesArray =
      this.getVariantImages(
        variantIndex
      );

    Array.from(input.files)
      .forEach(file => {

        // Vérifier image
        if (
          !file.type.startsWith('image/')
        ) {

          this.showAlert(
            `${file.name} n'est pas une image valide.`,
            'error'
          );

          return;
        }

        /*
         * IMPORTANT:
         *
         * Ici aucun appel au backend.
         *
         * L'image reste seulement
         * en mémoire.
         */
        const preview =
          URL.createObjectURL(file);

        this.pendingImages[
          variantIndex
        ].push({

          file: file,

          preview: preview

        });

        /*
         * On met le blob URL dans le FormArray
         * uniquement pour afficher le preview.
         */
        imagesArray.push(
          this.fb.control(
            preview
          )
        );

      });

    /*
     * Permet de sélectionner à nouveau
     * le même fichier.
     */
    input.value = '';
  }

  // ============================================================
  // REMOVE IMAGE
  // ============================================================

  removeVariantImage(
    variantIndex: number,
    imageIndex: number
  ): void {

    const imagesArray =
      this.getVariantImages(
        variantIndex
      );

    const imageValue =
      imagesArray
        .at(imageIndex)
        ?.value;

    /*
     * Si nouvelle image,
     * supprimer aussi le File temporaire.
     */
    if (
      typeof imageValue === 'string' &&
      imageValue.startsWith('blob:')
    ) {

      const pending =
        this.pendingImages[
          variantIndex
        ] || [];

      const pendingIndex =
        pending.findIndex(
          item =>
            item.preview === imageValue
        );

      if (
        pendingIndex !== -1
      ) {

        URL.revokeObjectURL(
          pending[
            pendingIndex
          ].preview
        );

        pending.splice(
          pendingIndex,
          1
        );
      }
    }

    imagesArray.removeAt(
      imageIndex
    );
  }

  // ============================================================
  // NORMALIZE IMAGE FILENAME
  // ============================================================

  normalizeImageFilename(
    img: string | null | undefined
  ): string {

    if (!img) {
      return '';
    }

    return img
      .replace(
        'http://localhost:8080/uploads/',
        ''
      )
      .replace(
        'https://localhost:8080/uploads/',
        ''
      )
      .replace(
        'http://localhost:8080/',
        ''
      )
      .replace(
        'https://localhost:8080/',
        ''
      )
      .replace(
        /^\/?uploads\//,
        ''
      );
  }

  // ============================================================
  // UPLOAD PENDING IMAGES
  // ============================================================

  uploadPendingImages():
    Observable<string[]> {

    const requests:
      Observable<string>[] = [];

    /*
     * On garde l'ordre:
     *
     * variante 1
     *   image 1
     *   image 2
     *
     * variante 2
     *   image 1
     *
     * etc.
     */
    this.pendingImages.forEach(
      variantFiles => {

        variantFiles.forEach(
          item => {

            requests.push(

              this.productService
                .uploadImage(item.file)
                .pipe(

                  map(result =>
                    this.normalizeImageFilename(
                      result
                    )
                  )

                )

            );
          }
        );
      }
    );

    // Aucune nouvelle image
    if (requests.length === 0) {

      return of([]);
    }

    return forkJoin(
      requests
    );
  }

  // ============================================================
  // REPLACE TEMPORARY IMAGES
  // ============================================================

  replaceTemporaryImages(
    uploadedFilenames: string[]
  ): void {

    let uploadIndex = 0;

    this.variants.controls
      .forEach(
        (variant: any) => {

          const imagesArray =
            variant.get(
              'images'
            ) as FormArray;

          imagesArray.controls
            .forEach(
              (control: any) => {

                const value =
                  control.value;

                /*
                 * blob = nouvelle image
                 */
                if (
                  typeof value === 'string' &&
                  value.startsWith('blob:')
                ) {

                  const filename =
                    uploadedFilenames[
                      uploadIndex
                    ];

                  control.setValue(
                    filename
                  );

                  uploadIndex++;
                }

              }
            );
        }
      );

    /*
     * Nettoyer les blob URLs
     */
    this.pendingImages.forEach(
      variantFiles => {

        variantFiles.forEach(
          item => {

            if (
              item.preview.startsWith('blob:')
            ) {

              URL.revokeObjectURL(
                item.preview
              );
            }

          }
        );
      }
    );

    this.pendingImages =
      this.pendingImages.map(
        () => []
      );
  }

  // ============================================================
  // VALIDATION
  // ============================================================

  isInvalid(
    control: any
  ): boolean {

    return (
      control &&
      control.invalid &&
      (
        control.touched ||
        this.submitted
      )
    );
  }

  isValidProduct(): boolean {

    const variants =
      this.variants.value;

    return (
      variants.length > 0 &&
      variants.every(
        (v: any) =>
          v.colorName &&
          v.images?.length > 0 &&
          v.sizes?.length > 0 &&
          v.sizes.some(
            (s: any) =>
              s.size &&
              s.stock > 0
          )
      )
    );
  }

  // ============================================================
  // SAVE
  // ============================================================

  addProduct(): void {

    this.submitted = true;

    this.form.markAllAsTouched();

    // ==========================================================
    // BASIC
    // ==========================================================

    if (
      !this.form.get('name')?.value
    ) {

      this.showAlert(
        'Le nom du produit est requis.',
        'error'
      );

      return;
    }

    if (
      !this.form.get('price')?.value &&
      this.form.get('price')?.value !== 0
    ) {

      this.showAlert(
        'Le prix est requis.',
        'error'
      );

      return;
    }

    if (
      !this.form.get('category')?.value
    ) {

      this.showAlert(
        'Veuillez sélectionner une catégorie.',
        'error'
      );

      return;
    }

    // ==========================================================
    // VARIANTS
    // ==========================================================

    if (!this.variants.length) {

      this.showAlert(
        'Ajoutez au moins une variante.',
        'error'
      );

      return;
    }

    // ==========================================================
    // VALIDATE VARIANTS
    // ==========================================================

    for (
      let i = 0;
      i < this.variants.length;
      i++
    ) {

      const v =
        this.variants.at(i).value;

      // COLOR NAME

      if (!v.colorName) {

        this.showAlert(
          `Variante ${i + 1}: La couleur est requise.`,
          'error'
        );

        return;
      }

      // COLOR VALUE

      if (!v.colorValue) {

        this.variants
          .at(i)
          .get('colorValue')
          ?.setValue('#000000');
      }

      // IMAGES

      if (
        !v.images ||
        v.images.length === 0
      ) {

        this.showAlert(
          `Variante ${i + 1}: Ajouter au moins une image.`,
          'error'
        );

        return;
      }

      // SIZES

      if (
        !v.sizes ||
        v.sizes.length === 0
      ) {

        this.showAlert(
          `Variante ${i + 1}: Ajouter au moins une taille.`,
          'error'
        );

        return;
      }

      for (
        let j = 0;
        j < v.sizes.length;
        j++
      ) {

        const s =
          v.sizes[j];

        if (!s.size) {

          this.showAlert(
            `Variante ${i + 1}: Choisir la taille.`,
            'error'
          );

          return;
        }

        if (
          s.stock === null ||
          s.stock === undefined ||
          s.stock <= 0
        ) {

          this.showAlert(
            `Variante ${i + 1}: Le stock doit être supérieur à 0.`,
            'error'
          );

          return;
        }
      }
    }

    // ==========================================================
    // NEW IMAGES ?
    // ==========================================================

    const hasPendingImages =
      this.pendingImages.some(
        files =>
          files.length > 0
      );

    if (hasPendingImages) {

      this.showAlert(
        'Téléchargement des images...',
        'warning'
      );

      this.uploadPendingImages()
        .subscribe({

          next: (
            uploadedFilenames
          ) => {

            /*
             * Remplacer les blob:
             * par les vrais filenames.
             */
            this.replaceTemporaryImages(
              uploadedFilenames
            );

            /*
             * Maintenant seulement,
             * sauvegarder le produit.
             */
            this.saveProductToBackend();
          },

          error: (error) => {

            console.error(
              'Erreur upload images:',
              error
            );

            this.showAlert(
              'Erreur lors du téléchargement des images.',
              'error'
            );
          }

        });

    } else {

      /*
       * Pas de nouvelle image.
       * On sauvegarde directement.
       */
      this.saveProductToBackend();
    }
  }

  // ============================================================
  // SAVE PRODUCT TO BACKEND
  // ============================================================

  private saveProductToBackend(): void {

    const productData: any = {
      ...this.form.value
    };

    /*
     * Nettoyer les images avant d'envoyer
     * au backend.
     */
    productData.variants =
      productData.variants.map(
        (variant: any) => {

          return {

            ...variant,

            colorValue:
              variant.colorValue ||
              '#000000',

            images:
              (variant.images || [])
                .map(
                  (img: string) =>
                    this.normalizeImageFilename(
                      img
                    )
                )
          };
        }
      );

    // ==========================================================
    // UPDATE
    // ==========================================================

    if (this.editMode) {

      this.productService
        .updateProduct({

          ...productData,

          id: this.productId

        })
        .subscribe({

          next: () => {

            this.showAlert(
              'Produit mis à jour avec succès.',
              'success'
            );

            setTimeout(
              () => {

                this.router.navigate([
                  '/product-list'
                ]);

              },
              1000
            );
          },

          error: (error) => {

            console.error(
              'Erreur update produit:',
              error
            );

            this.showAlert(
              'Erreur lors de la mise à jour du produit.',
              'error'
            );
          }

        });

    } else {

      // ========================================================
      // ADD
      // ========================================================

      this.productService
        .addProduct(productData)
        .subscribe({

          next: () => {

            this.showAlert(
              'Produit enregistré avec succès.',
              'success'
            );

            this.resetFormAfterSave();
          },

          error: (error) => {

            console.error(
              'Erreur ajout produit:',
              error
            );

            this.showAlert(
              'Erreur lors de l\'enregistrement du produit.',
              'error'
            );
          }

        });
    }
  }

  // ============================================================
  // RESET AFTER SAVE
  // ============================================================

  private resetFormAfterSave(): void {

    this.clearPendingImages();

    this.form.reset();

    this.variants.clear();

    this.availableSizes = [];

    this.submitted = false;

    this.selectedImage = null;
  }

  // ============================================================
  // RESET
  // ============================================================

  resetForm(): void {

    this.clearPendingImages();

    this.form.reset();

    this.variants.clear();

    this.availableSizes = [];

    this.submitted = false;

    this.selectedImage = null;
  }

  // ============================================================
  // CLEAR PENDING IMAGES
  // ============================================================

  private clearPendingImages(): void {

    this.pendingImages.forEach(
      variantFiles => {

        variantFiles.forEach(
          item => {

            if (
              item.preview &&
              item.preview.startsWith('blob:')
            ) {

              URL.revokeObjectURL(
                item.preview
              );
            }

          }
        );
      }
    );

    this.pendingImages = [];
  }

  // ============================================================
  // ALERT
  // ============================================================

  showAlert(
    message: string,
    type: 'success' | 'error' | 'warning'
  ): void {

    this.alertMessage = message;

    this.alertType = type;

    setTimeout(
      () => this.closeAlert(),
      4000
    );
  }

  closeAlert(): void {

    this.alertMessage = '';

    this.alertType = '';
  }

  // ============================================================
  // IMAGE MODAL
  // ============================================================

  openImage(
    img: string
  ): void {

    this.selectedImage = img;
  }

  closeImage(): void {

    this.selectedImage = null;
  }
}
