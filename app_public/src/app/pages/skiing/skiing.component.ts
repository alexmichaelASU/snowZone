import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
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
  selector: 'app-skiing',
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
  templateUrl: './skiing.component.html',
  styleUrl: './skiing.component.css'
})
export class SkiingComponent implements OnInit{
  products$: Observable<any[]> = of([]);
  manufacturers: string[] = [];
  conditions: string[] = [];
  colors: string[] = [];
  sizes: string[] = [];
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProductsByTheme('skiing');
    
    this.products$.subscribe(products => {

      console.log(products);

      this.manufacturers = this.getUniqueValues(products, 'manufacturer');
      this.conditions = this.getUniqueValues(products, 'condition');
      this.colors = this.getUniqueValues(products, 'color');
      this.sizes = this.getUniqueValues(products, 'size');
  });
  }
  
  getUniqueValues(products: any[], property: string): string[] {
    const values = products.map(product => product[property]);
    return Array.from(new Set(values)); 
  }
}
