import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRole } from '../../models/admin-models/irole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl: string = environment.baseUrl;
  token: string | null ='';

  constructor(private httpClient: HttpClient) {}

  getAllRoles(): Observable<IRole[]> {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      throw new Error('Access token not found');
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    return this.httpClient.get<any>(`${this.baseUrl}api/admin/Role/GetAllRoles`, { headers: headers })
      .pipe(
        catchError(error => {
          // Handle unauthorized errors or other HTTP errors
          if (error.status === 401) {
            // Unauthorized: Redirect the user to the login page or handle the error appropriately
            console.error('Unauthorized request');
            // Example: Redirect to login page
            // this.router.navigate(['/login']);
          }
          return throwError(() => error.message);
        })
      );
  }
}
