import { Component, OnInit} from '@angular/core';
import { WebRequestService } from '../../services/web-request.service';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    RouterOutlet, RouterLink, RouterLinkActive,
    NgFor,
    CommonModule

  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  products$: Observable<any[]> = of([]);
  wishProducts$: Observable<any[]> = new Observable<any[]>();
  constructor(private webReq: WebRequestService, private router: Router, private proSer: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.proSer.getProductsByContact();
    this.fetchWishlistProducts();
  }

  onLogoutClick(): void {
    this.webReq.logout();
    this.router.navigate(['/login']);
  }

  deletePro(productID: string): void {
    this.proSer.deleteProduct(productID).subscribe({
        next: () => {
            console.log(`Product ${productID} deleted successfully`);
            this.products$ = this.proSer.getProductsByContact();
        },
        error: (err) => {
            console.error(`Error deleting product ${productID}:`, err);
        }
    });
}

fetchWishlistProducts(): void {
  this.wishProducts$ = this.proSer.getWishlistByEmail().pipe(
      switchMap((wishlistItems: any[]) => {
        console.log('Wishlist items:', wishlistItems);
          if (wishlistItems.length === 0) {
              return of([]);
          }

          const productObservables = wishlistItems
              .map((item) => {
                  if (item._productId) {
                      console.log(this.proSer.getSingleProduct(item._productId));
                      return this.proSer.getSingleProduct(item._productId);
                  } else {
                      console.warn('Undefined product ID in wishlist item:', item);
                      return of(null); 
                  }
              })
              .filter((observable) => observable !== null);

          if (productObservables.length === 0) {
              return of([]);
          }

          return forkJoin(productObservables);
      }),
      catchError((err) => {
          console.error('Error fetching wishlist products:', err);
          return of([]);
      })
  );
}


}
