import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButton
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  constructor(private productService: ProductService) {}

  theme: string = '';
  name: string = '';
  condition: string = '';
  description: string = '';
  price: number = 0;
  manufacturer: string = '';
  size: string = '';
  color: string = '';
  contact: string ='';
  uploadedFile: File | null = null;

  
  onSubmit(event: Event) {
    
    event.preventDefault();

    
    const formData = new FormData();
    formData.append('theme', this.theme);
    formData.append('name', this.name);
    formData.append('condition', this.condition);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('manufacturer', this.manufacturer);
    formData.append('size', this.size);
    formData.append('color', this.color);
    formData.append('contact', this.contact); 
    if (this.uploadedFile) {
        formData.append('productImage', this.uploadedFile, this.uploadedFile.name);
    }

    
    this.productService.createProduct(formData).subscribe(
        response => {
            console.log('Product created successfully!', response);
            
        },
        error => {
            console.error('Error creating product:', error);
            
        }
    );
}

  
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.uploadedFile = input.files[0];
    }
  }
}