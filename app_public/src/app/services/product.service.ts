import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  constructor(private webReqService: WebRequestService) {  
      
  }
  
  createProduct(productData: any, productImageFile: File): Observable<any> {
    const formData = new FormData();

    formData.append('theme', productData.theme);
    formData.append('name', productData.name);
    formData.append('condition', productData.condition);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    formData.append('manufacturer', productData.manufacturer);
    formData.append('size', productData.size);
    formData.append('color', productData.color);

    if (productImageFile) {
      formData.append('productImage', productImageFile);
    }

    return this.webReqService.post('api/products', formData);
  }


  updateProduct(productId: string, updatedData: any, productImageFile?: File): Observable<any> {
    const formData = new FormData();

    for (const key in updatedData) {
        if (updatedData.hasOwnProperty(key)) {
            formData.append(key, updatedData[key]);
        }
    }

    if (productImageFile) {
        formData.append('productImage', productImageFile);
    }
    
    return this.webReqService.put('api/products', productId, formData);
  }

  getSingleProduct(productId: string) {
    return this.webReqService.getSingle('api/products', productId);
  }

  getProductsByTheme(theme: string): Observable<any[]> {
    return this.webReqService.getProductsByTheme1('api/products/theme',theme);
  }

  getAllProducts() {
    return this.webReqService.getAll('api/products');
  }

  deleteProduct(productId: string): Observable<any> {
    return this.webReqService.delete(`api/products/${productId}`);
  }
}
