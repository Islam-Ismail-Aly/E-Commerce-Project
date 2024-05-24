import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IProduct } from '../../../models/iproduct';
import { ProductApiService } from '../../../services/product-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, OnDestroy {
  products: IProduct[];
  private userSubscription!: Subscription;

  constructor(
    public productApiService: ProductApiService,
    private router: Router
  ) {
    this.products = [];
  }

  ngOnInit(): void {
    this.userSubscription = this.productApiService.getAllProducts().subscribe({
      next: (response:any) => {
        if (response.success && Array.isArray(response.data)) {
          this.products = response.data;
          console.log('Products loaded:', this.products);
        } else {
          console.error('Failed to load products:', response.message);
        }
      },
      error: (error) => {
        Swal.fire(
          'Error!',
          error.message,
          'error'
        );
      },
    });
  }

  deleteOperation(productId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this! \n Product No. ' + productId,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        );

        this.productApiService.deleteProduct(productId).subscribe({
          next: () => {
            this.products = this.products.filter(
              (product) => product.id != productId
            );
          },
          error: (error) => {
            Swal.fire(
            'Error!',
            error.message,
            'error'
          );},
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your product is safe!',
          'info'
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
