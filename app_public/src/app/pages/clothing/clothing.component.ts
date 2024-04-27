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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clothing',
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
    FormsModule
  ],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.css'
})
export class ClothingComponent implements OnInit{
  products$: Observable<any[]> = of([]);
  manufacturers: string[] = [];
  conditions: string[] = [];
  colors: string[] = [];
  sizes: string[] = [];

  // Define properties for the selected filter values
  selectedManufacturer: string | undefined;
  selectedCondition: string | undefined;
  selectedColor: string | undefined;
  selectedSize: string | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProductsByTheme('clothing');
    
    
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

  onFilterSubmit(): void {
    const filters: any = {
        manufacturer: this.selectedManufacturer,
        condition: this.selectedCondition,
        color: this.selectedColor,
        size: this.selectedSize,
    };

    Object.keys(filters).forEach(key => {
        if (filters[key] === undefined) {
            delete filters[key];
        }
    });

    this.products$ = this.productService.getProductsByThemeAndFilters('clothing', filters);
  }

}
