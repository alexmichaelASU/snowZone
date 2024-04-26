import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-single-listing',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        RouterOutlet, 
        RouterLink, 
        RouterLinkActive,
    ],
    templateUrl: './single-listing.component.html',
    styleUrls: ['./single-listing.component.css'],
})
export class SingleListingComponent implements OnInit {
    productId!: string;
    product: any;
    namer!: string;
    manu!: string;
    pricer!: string;
    sizer!: string;
    colorr!: string;
    con!: string;
    imager!: any;
    desc!: string;
    cont!: string;
    constructor(private route: ActivatedRoute, private productService: ProductService) { }

    ngOnInit(): void {
        
        this.route.params.subscribe(params => {
            this.productId = params['id'];
            
            this.productService.getSingleProduct(this.productId).subscribe(product => {
                this.product = product;
                this.namer = this.product.name;
                this.manu = this.product.manufacturer;
                this.pricer = this.product.price
                this.sizer = this.product.size
                this.colorr = this.product.color
                this.con = this.product.condition
                this.imager = this.product.productImage;
                this.desc = this.product.description;
                this.cont = this.product.contact;
            });
        });
    }
}
