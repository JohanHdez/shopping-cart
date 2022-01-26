import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
// import { Product } from 'src/app/store/product.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { StoreService } from 'src/app/shared/services/store.service';
import { addProduct, removeProduct } from 'src/app/app.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  carts = [];
  cutValue = 1;
  cart: Observable<Array<any>>
  cartsList
  constructor(private store: Store<{cart:any}>, private storeSrvice: StoreService, public afs: AngularFirestore,  ) {
    this.cart = this.store.select('cart');
    this.cart.subscribe(val => {
      this.cartsList = this.getCart()
        this.carts = val;
    });
   }

  ngOnInit(): void {
    this.getCart();
  }


  removeFromCart(product) {
    this.carts.forEach((element, index) => {
      if (element.id === product.id) {
        this.carts.splice(index, 1);
      }
    })
    this.storeSrvice.deleteCartData(product)
    this.store.dispatch(removeProduct({produts: this.carts}))
  }

  shoppingArticle(product) {
    this.storeSrvice.validateCartData(product)
  }

  getCart() {
    this.storeSrvice.getCart().subscribe(val  => {
      this.storeSrvice.GetProductsCart(val.docs[0].id).subscribe(item => {
        const data: any = item.data()
        this.carts = data.products;
      })
    });
    this.cartsList.forEach(element => this.store.dispatch(addProduct({produts: element})))
    
  }

}
