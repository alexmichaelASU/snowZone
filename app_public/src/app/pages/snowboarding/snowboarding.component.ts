import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable, of } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-snowboarding',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    NgFor,
    CommonModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
  ],
  templateUrl: './snowboarding.component.html',
  styleUrls: ['./snowboarding.component.css']
})
export class SnowboardingComponent implements OnInit {
  products$: Observable<any[]> = of([]);
  manufacturers: string[] = [];
  conditions: string[] = [];
  colors: string[] = [];
  sizes: string[] = [];
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetch the products for snowboarding
    this.products$ = this.productService.getProductsByTheme('snowboarding');
    
    // Subscribe to the observable and process the products
    this.products$.subscribe(products => {
      // Log the products to inspect the data
      console.log(products);

      // Extract unique values for each field
      this.manufacturers = this.getUniqueValues(products, 'manufacturer');
      this.conditions = this.getUniqueValues(products, 'condition');
      this.colors = this.getUniqueValues(products, 'color');
      this.sizes = this.getUniqueValues(products, 'size');
  });
  }
  
  // Function to extract unique values from products based on a given property
  getUniqueValues(products: any[], property: string): string[] {
    const values = products.map(product => product[property]);
    return Array.from(new Set(values)); // Use Set to remove duplicates and convert back to array
  }

}
