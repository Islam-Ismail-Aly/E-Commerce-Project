import { RoleService } from './../../../services/admin-services/role.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IRole } from '../../../models/admin-models/irole';
import Swal from 'sweetalert2';
import 'datatables.net';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit, OnDestroy{
  roles: IRole[];
  dataTable: any;
  private userSubscription!: Subscription;

  constructor(private roleService: RoleService, private router: Router) {
    this.roles = [];
  }


  ngOnInit(): void {
    this.userSubscription = this.roleService.getAllRoles().subscribe({
      next: (response:any) => {
        this.roles = response;
        if (response.success && Array.isArray(response.data)) {
          this.roles = response.data;
          console.log('Roles loaded:', this.roles);
        } else {
          console.error('Failed to load roles:', response.message);
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

  // ngAfterViewInit(): void {
  //   this.initializeDataTable();
  // }

  // initializeDataTable(): void {
  //   this.dataTable = $('#dataTable').DataTable({
  //     data: this.roles,
  //     columns: [
  //       {title: 'RoleName', data:'role'}
  //     ]
  //   });
  // }

  ngOnDestroy(): void {
     // Clean up DataTable instance
    //  if (this.dataTable) {
    //   this.dataTable.destroy();
    // }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
