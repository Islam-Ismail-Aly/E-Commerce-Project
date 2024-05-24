import { Injectable } from '@angular/core';
import { ICategory } from '../../models/admin-models/icategory';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = environment.baseUrl;
  token: string | null ='';

  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<ICategory[]> {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      throw new Error('Access token not found');
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    return this.httpClient.get<ICategory[]>(`${this.baseUrl}api/admin/Category/GetAllCategories`, { headers: headers })
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
