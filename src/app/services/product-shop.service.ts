import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductShopService {
  baseUrl: string = environment.baseUrl;
  token: string | null ='';

  constructor(private HttpClient: HttpClient) { }

  // getAllProducts(): Observable<IProduct[]> {

  //   //const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  //   return this.HttpClient.get<any>(`${this.baseUrl}api/Product/GetAllProducts`);
  // }

  getPaginatedProducts(pageNumber: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.HttpClient.get<any>(`${this.baseUrl}api/Product/GetPaginatedProducts`, { params });
  }

  getProductById(productId: number): Observable<IProduct> {

    //const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.HttpClient.get<any>(`${this.baseUrl}api/Product/GetProductById/${productId}`);

  }
}
