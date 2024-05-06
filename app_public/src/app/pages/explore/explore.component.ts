import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Observable, of } from 'rxjs';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    MatCardModule,
    NgFor,
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatButtonModule

  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  products$: Observable<any[]> = of([]);
  manufacturers: string[] = [];
  conditions: string[] = [];
  colors: string[] = [];
  sizes: string[] = [];
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  addToWishlist(productId: string): void {
    this.productService.createWishlistItem(productId).subscribe({
        next: (response) => {
            console.log('Added to wishlist:', response);
        },
        error: (error) => {
            console.error('Error adding to wishlist:', error);
        }
    });
}

}
