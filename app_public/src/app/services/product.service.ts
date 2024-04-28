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
}
