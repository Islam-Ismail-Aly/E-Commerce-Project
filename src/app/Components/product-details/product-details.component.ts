import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductShopService } from '../../services/product-shop.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productId: any;
  product?: any;
  subscriptions: any;
  
  constructor(
    public activatedRoute: ActivatedRoute,
    public productServices: ProductShopService,
    public router: Router
  ) {}


  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.subscriptions = this.productServices.getProductById(this.productId).subscribe({
      next: (response:any) => {
        console.log("Product Details" + response.data);
        this.product = response.data;
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

  ngOnDestroy(): void {
     if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
