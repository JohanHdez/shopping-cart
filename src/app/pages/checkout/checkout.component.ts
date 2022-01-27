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
  cart: Observable<any[]>
  showproducts = []
  cartsList
  constructor(private store: Store<{cart:any}>, private storeSrvice: StoreService, public afs: AngularFirestore,  ) {
    store.select('cart').subscribe(val => {
      this.showproducts = val.products;
    })
    this.getCart()
   }

  ngOnInit(): void {
   
  }


  removeFromCart(product) {
    const data = this.showproducts.filter(item => {
      return item.id != product.id
    })
    this.storeSrvice.deleteCartData(product)
    this.store.dispatch(removeProduct({produts: data}))
  }

  shoppingArticle(product) {
    this.storeSrvice.validateCartData(product)
  }

  getCart() {
    this.storeSrvice.getCart().subscribe(val  => {
      this.storeSrvice.GetProductsCart(val.docs[0].id).subscribe(item => {
        const data: any = item.data()
        if(data.products.length == 0){
          data.products.forEach(element => {
            this.store.dispatch(addProduct({produts: element}))
          });
        }
      })
    });
    
    
  }

}
