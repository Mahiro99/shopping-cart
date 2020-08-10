import { Component, OnInit } from '@angular/core';
import { IProduct } from './IProduct';
import { ProductService } from '../product.service';
import { cartProduct } from '../cart/cartinterface';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  showId: boolean;
  buttonDisplayValue: string;

  products: IProduct[];
  // cartproducts: cartProduct[];

  // textBoxValue: string;

  constructor(private productService: ProductService) {
    this.showId = true;
    this.buttonDisplayValue = 'Hide Id';
    this.productService.productBehaviourSubject.subscribe(
      newProducts => {
        this.products =  newProducts;
        console.log(newProducts);
      }
    );
  }
  ngOnInit() {
  }

  hideIt(event: any) {
    this.showId = !this.showId;
    if (this.showId === false) {
      this.buttonDisplayValue = 'Show Id';
    } else {
      this.buttonDisplayValue = 'Hide Id';
    }
  }

  addPost() {
    this.productService.addPost();
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id);
  }

  updateProduct(id) {
    this.productService.updateProduct(id);
  }

  addCart(id){
    this.productService.addCart(id);
  }
  
  // async getProductById() {
  //   const res = await this.productService.getProductByIdAsync();
  //   console.log(res);
  // }

}
