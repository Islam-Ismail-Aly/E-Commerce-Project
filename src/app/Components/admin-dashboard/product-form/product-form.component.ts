import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../../../services/product-api.service';
import { Cloudinary } from '@cloudinary/url-gen';
import { CategoryService } from '../../../services/admin-services/category.service';
import { ICategory } from '../../../models/admin-models/icategory';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(15),
    ]),
    image: new FormControl(''),
    rating: new FormControl(0),
    category: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
  });

  productId: any;
  product: any;
  categories: ICategory[] = [];

  constructor(
    private productApiService: ProductApiService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.resetForm();
        if (this.productId != 0) {
          this.loadProductData();
        }
      },
    });

    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response:any) => {
        this.categories = response;
        if (response.success && Array.isArray(response.data)) {
          this.categories = response.data;
          console.log('Categories loaded:', this.categories);
        } else {
          console.error('Failed to load categories:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        Swal.fire('Error!', 'Error fetching categories', 'error');
      }
    });
  }

  get getName() {
    return this.productForm.controls['name'];
  }

  get getImage() {
    return this.productForm.controls['image'];
  }

  get getCategory() {
    return this.productForm.controls['category'];
  }

  get getRating() {
    return this.productForm.controls['rating'];
  }

  get getPrice() {
    return this.productForm.controls['price'];
  }

  get getQuantity() {
    return this.productForm.controls['quantity'];
  }

  private resetForm() {
    this.getName.setValue('');
    this.getPrice.setValue(null);
    this.getQuantity.setValue(null);
    this.getImage.setValue('');
    this.getCategory.setValue('');
    this.getRating.setValue(null);
  }

  private loadProductData() {
    this.productApiService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        this.getName.setValue(this.product.name);
        this.getImage.setValue(this.product.image);
        this.getCategory.setValue(this.product.category);
        this.getPrice.setValue(this.product.price);
        this.getQuantity.setValue(this.product.quantity);
        this.getRating.setValue(this.product.rating);
      },
    });
  }

  productOperation() {
    if (this.productForm.status == 'VALID') {
      if (this.productId == 0) {
        this.productApiService.addNewProduct(this.productForm.value).subscribe({
          next: () => {
            Swal.fire('Success!', 'Product added successfully!', 'success');
            this.router.navigate(['/admin/products']);
          },
          error: (error) => {
            Swal.fire('Error!', error.message, 'error');
          },
        });
      } else {
        this.productApiService
          .editProduct(this.productId, this.productForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/admin/products']);
            },
          });
      }
    } else {
      Swal.fire('Error!', 'Error in form', 'error');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log('file',file);
    console.log('file name',file.name);

    if (file) {
      this.uploadImageToCloudinary(file);
    }
  }

  private uploadImageToCloudinary(file: File) {
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dxvxieh27',
        apiKey: '572837555842738',
        apiSecret: 'TNfVVaCRee5GWx4k_kP4uYFOsQE'
      }
    });
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'IslamCloudy');
  
    fetch(`https://api.cloudinary.com/v1_1/dxvxieh27/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error('Cloudinary error:', data.error.message);
        } else {
          this.getImage.setValue(data.secure_url);
          console.log('Cloud', JSON.stringify(data, null, 2));
        }
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  }
  
  
}