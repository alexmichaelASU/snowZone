import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButton,
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  constructor(private productService: ProductService, private router: Router) {}

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
    
    // Append form data
    formData.append('theme', this.theme);
    formData.append('name', this.name);
    formData.append('condition', this.condition);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('manufacturer', this.manufacturer);
    formData.append('size', this.size);
    formData.append('color', this.color);
    
    const emailFromLocalStorage = localStorage.getItem('email');
    formData.append('contact', emailFromLocalStorage ?? ''); 

    if (this.uploadedFile) {
        formData.append('productImage', this.uploadedFile, this.uploadedFile.name);
    }

    this.productService.createProduct(formData).subscribe(
        response => {
            console.log('Product created successfully!', response);
            if (this.theme.toLowerCase() === 'snowboarding') {
                this.router.navigate(['/snowboards']);
            } else if (this.theme.toLowerCase() === 'skiing') {
                this.router.navigate(['/skii']);
            } else if (this.theme.toLowerCase() === 'clothing') {
                this.router.navigate(['/clothing']);
            }
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