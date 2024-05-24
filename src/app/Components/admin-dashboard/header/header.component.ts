import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName: string | null = '';
  role: string | null = '';

  constructor(private _router: Router, private _authService: AuthService) {    
  }
  ngOnInit(): void {
    this.userName = this._authService.getUserName;
    this.role = this._authService.getRole;
  }

  logout() {
    this._authService.Logout();
    this._router.navigate(['/login']);
    window.location.reload();
  }

}
