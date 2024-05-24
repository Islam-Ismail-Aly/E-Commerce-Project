import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategory } from '../../../models/admin-models/icategory';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../services/admin-services/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, OnDestroy{

 categories: ICategory[];
  private userSubscription!: Subscription;

  constructor(private _categoryService: CategoryService, private _router: Router) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.userSubscription = this._categoryService.getAllCategories().subscribe({
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
        Swal.fire(
          'Error!',
          error.message,
          'error'
        );
      },
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
