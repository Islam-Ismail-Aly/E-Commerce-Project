import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IDashboard } from '../../../models/admin-models/idashboard';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../../services/admin-services/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.css'
})
export class DashboardContentComponent implements OnInit, OnDestroy {
  dashboard!: IDashboard;

  usersCount!:number;
  rolesCount!:number;
  productsCount!:number;
  categoriesCount!:number;

  private userSubscription!: Subscription;



  constructor(private _dashboardService: DashboardService, private _router: Router) {
  }

  ngOnInit(): void {
    this.userSubscription = this._dashboardService.getDashboardData().subscribe({
      next: (data: IDashboard) => {
        console.log(data);
        this.usersCount = data.usersCount;
        this.productsCount = data.productsCount;
        this.rolesCount = data.rolesCount;
        this.categoriesCount = data.categoriesCount;
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
