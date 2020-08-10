import { Injectable } from '@angular/core';
import { IProduct } from './product-list/IProduct';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cartProduct } from './cart/cartinterface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _counter = 10;
  private apiURL: string = 'https://localhost:5001';

  products: IProduct[];

  cartBehaviourSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);

  productBehaviourSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);


  constructor(private http: HttpClient) {
    this.http
    .get<IProduct[]>(`${this.apiURL}/api/product`)
    .subscribe(products => {
     this.productBehaviourSubject.next(products);
    });
  }


  // async getProductByIdAsync(): Promise<IProduct>{
  //   const res = await  this.http.get<IProduct>(`${this.apiURL}/api/product/2`).toPromise();
  //   return res;
  // }

   addPost() {
    const post_data ={
      productId: ++this._counter,
      productName: 'Spider',
      price: 12,
      description: 'pls somebody buy dis',
      starRating: 5,
      imageUrl: 'https://openclipart.org/image/300px/svg_to_png/321216/tarantula.png'
      };


    this.http
    .post<IProduct>(`${this.apiURL}/api/product`, JSON.stringify(post_data), httpOptions)
    .subscribe(
      result => {
      const products = this.productBehaviourSubject.value;
      products.push(result);
      this.productBehaviourSubject.next(products);
      },

      error => console.log(error)

      );
  }

  deleteProduct(id) {
    this.http
    .delete<IProduct>(`${this.apiURL}/api/product/${id}`)
    .subscribe(
      result => {
      const products = this.productBehaviourSubject.value;
      products.pop();
      this.productBehaviourSubject.next(products);
      },

      error => console.log(error)

      );
  }

  addCart(id) {
    this.http
    .get<IProduct>(`${this.apiURL}/api/product/${id}`)
    .subscribe(cartproducts => {
      const cartStuff = this.cartBehaviourSubject.value;

      const inCart = cartStuff.findIndex(obj => obj.productId === id);

      const counter = this.productBehaviourSubject.value.find(obj => obj.productId === id);

      if (inCart > -1) {
        counter.quantity++;
      } else {
        counter.quantity = 1;
        cartStuff.push(counter);
        this.cartBehaviourSubject.next(cartStuff);
      }
    });
  }



    // Incomplete code
  updateProduct(id) {
    const new_updated_data = {
      productId: ++this._counter,
      productName: 'scissor woop',
      price: 10.2,
      description: 'Curved claw steel scissor ',
      starRating: 4,
      imageUrl: 'https://openclipart.org/image/300px/svg_to_png/318557/openclipart-logo-2019.png'
    }

    this.http
    .put<IProduct>(`${this.apiURL}/api/product/${id}`, JSON.stringify(new_updated_data), httpOptions)
    .subscribe(
      result => {
      const products = this.productBehaviourSubject.value;
      products.push(result);
      this.productBehaviourSubject.next(products);
      },
      error => console.log(error)
      );
  }
}
