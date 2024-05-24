import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/iproduct';
import { ProductItemComponent } from '../product-item/product-item.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductShopService } from '../../services/product-shop.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, ProductItemComponent, CommonModule, FooterComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  private userSubscription!: Subscription;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(public productService: ProductShopService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.userSubscription = this.productService.getPaginatedProducts(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.products = response.data;
          this.totalPages = response.data.totalPages;
          console.log('Products loaded:', this.products);
        } else {
          console.error('Failed to load products:', response.message);
        }
      },
      error: (error) => {
        Swal.fire('Error!', error.message, 'error');
      },
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
