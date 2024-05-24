import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IAddProduct } from '../models/admin-models/iadd-product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  baseUrl: string = environment.baseUrl;
  token: string | null = localStorage.getItem('token');

  constructor(private httpClient: HttpClient) { }

  private getHeaders() {
    if (!this.token) {
      throw new Error('Access token not found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getAllProducts(): Observable<IProduct[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<IProduct[]>(`${this.baseUrl}api/admin/Product/GetAllProducts`, { headers });
  }

  getProductById(productId: number): Observable<IProduct> {
    const headers = this.getHeaders();
    return this.httpClient.get<IProduct>(`${this.baseUrl}api/admin/Product/GetProductById/${productId}`, { headers });
  }

  addNewProduct(product: any): Observable<IAddProduct> {
    const headers = this.getHeaders();
    return this.httpClient.post<IAddProduct>(`${this.baseUrl}api/admin/Product/AddProduct`, product, { headers });
  }

  editProduct(productId: number, product: any): Observable<IProduct> {
    const headers = this.getHeaders();
    return this.httpClient.put<IProduct>(`${this.baseUrl}api/admin/Product/UpdateProduct/${productId}`, product, { headers });
  }

  deleteProduct(productId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(`${this.baseUrl}api/admin/Product/DeleteProduct/${productId}`, { headers });
  }
}
