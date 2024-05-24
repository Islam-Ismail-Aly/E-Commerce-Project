import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product: IProduct = {
    id: 0,
    name: "",
    image: "",
    rating: 0,
    category: "",
    price: 0,
    quantity: 0
  };

  getRatingParts(rating: number): number[] {
    const integerPart = Math.floor(rating);
    const fractionalPart = rating - integerPart;
    const ratingParts = [];

    // Add integer
    for (let i = 0; i < integerPart; i++) {
      ratingParts.push(1);
    }

    // Add fractional part
    if (fractionalPart > 0) {
      ratingParts.push(0.5);
    }

    return ratingParts;
  }
}
