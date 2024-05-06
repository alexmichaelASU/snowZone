import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  constructor(private webReqService: WebRequestService) {  
      
  }
  
  createProduct(data: any): Observable<any> {
    return this.webReqService.post('api/products', data);
  }

  updateProduct(productId: string, data: any): Observable<any> {
    return this.webReqService.put(`api/products/${productId}`, data);
  }

  getSingleProduct(productId: string) {
    return this.webReqService.getSingle('api/products', productId);
  }

  getProductsByTheme(theme: string): Observable<any[]> {
    return this.webReqService.getProductsByTheme1('api/products/theme',theme);
  }

  getProductsByContact(): Observable<any[]> {
    const email = localStorage.getItem('email');

    if (!email) {
      throw new Error('Email not found in local storage.');
    }
    return this.webReqService.getProductsByTheme1('api/products/contact',email);
  }
  
  getProductsByThemeAndFilters(theme: string, filters?: { [key: string]: string | undefined }): Observable<any[]> {
    let queryParams = '';
    if (filters) {
        const queryParts = [];
        for (const key in filters) {
            if (filters[key]) {
                queryParts.push(`${key}=${encodeURIComponent(filters[key]!)}`);
            }
        }
        queryParams = queryParts.length > 0 ? '?' + queryParts.join('&') : '';
    }

    return this.webReqService.get(`api/products/theme/${theme}/filters${queryParams}`);
}



  getAllProducts() {
    return this.webReqService.getAll('api/products');
  }

  deleteProduct(productId: string): Observable<any> {
    return this.webReqService.delete(`api/products/${productId}`);
  }

  deleteWish(wishListId: string): Observable<any> {
    return this.webReqService.delete(`api/wishlist/${wishListId}`);
  }


  createWishlistItem(productId: string): Observable<any> {
    const email = localStorage.getItem('email');

    if (!email) {
      throw new Error('Email not found in local storage.');
    }

    const data = {
      email,
      productId
    };

    return this.webReqService.post('api/wishlist', data);
  }

  getWishlistByEmail(): Observable<any[]> {
    const email = localStorage.getItem('email');

    if (!email) {
      throw new Error('Email not found in local storage.');
    }
    return this.webReqService.get(`api/wishlist/${email}`);
  }

  deleteWishlistItem(id: string): Observable<any> {
    return this.webReqService.delete(`api/wishlist/${id}`);
  }

}
