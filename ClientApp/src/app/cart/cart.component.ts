import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product-list/IProduct';
import { cartProduct } from './cartinterface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: IProduct[];
  cartItems;

  constructor(private productService: ProductService) {
    this.productService.cartBehaviourSubject.subscribe(
      newCartItem => {
      this.cartProducts = newCartItem;
      }
    );
  }

  ngOnInit() {
  }


  clickedCart() {
    document.getElementById("myDropdown").classList.toggle("show");
    this.cartItems = this.cartProducts;
  }

  del(id){
    const cart = this.cartProducts;
    const index = cart.findIndex(obj => obj.productId === id);

    console.log(cart[index].quantity);
    //cart[index].price += cart[index].price;
    cart[index].quantity--;

    if (cart[index].quantity === 0 ) {
      cart.splice(index, 1);
    }
    this.productService.cartBehaviourSubject.next(cart);
  }
}
