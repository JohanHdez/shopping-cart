import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addProduct, removeProduct } from 'app/app.actions';
import { StoreService } from '@shared/services/store.service';
@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.scss']
})
export class ItemCartComponent implements OnInit {
  showproducts = [];
  quantity = 0; 
  constructor(private store: Store<{cart:any}>, private storeSrvice: StoreService, public afs: AngularFirestore,  ) {
    
    store.select('cart').subscribe(val => {
      this.showproducts = val.products;
    });
   }

  @Input() cart: any;
  
  
  ngOnInit(): void {
    this.quantity = this.cart.quantity 
  }


  removeFromCart(product) {
    const data = this.showproducts.filter(item => {
      return item.id != product.id
    })
    this.storeSrvice.deleteCartData(product)
    this.store.dispatch(removeProduct({product: data}))
  }

  shoppingArticle(product) {
    const item = {
      ...product,
      quantity: this.quantity
    }
    this.storeSrvice.validateCartData(item)
  }

}
