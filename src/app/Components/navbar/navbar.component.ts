import { Component, DoCheck, Injectable, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Authentication/auth.service';
import Swal from 'sweetalert2';
import { FooterComponent } from '../footer/footer.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements DoCheck {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  username: string | null = '';
  role: string | null = '';


  isAuthenticated = inject(AuthService).isAuthenticated;
  isAdminAuthorized = inject(AuthService).isAdminAuthorized;
  userName = inject(AuthService).getUserName;
  token = inject(AuthService).getToken;
  roles = inject(AuthService).getRole;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngDoCheck(): void {
    this.isLoggedIn = this.isAuthenticated;
    this.isAdmin = this.isAdminAuthorized;
    if (this.isLoggedIn == true && this.token != null) {
      this.username = this.userName;
      this.role = this.roles;
    }
  }

  logout() {
    this._authService.Logout();
    this._router.navigate(['/login']);
    window.location.reload();
  }

}
