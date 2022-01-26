import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart.model';
import { AuthService } from './auth.service';
import { docJoin, leftJoin, leftJoinDocument } from './docJoin';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
 

  constructor( public afs: AngularFirestore, private auhtService: AuthService) {
  }

  
  GetProductsList() {
    const userRef: AngularFirestoreCollection<any> = this.afs.collection('products');
    return userRef.get();
  } 

  public getCart() {
    const cartRef: AngularFirestoreCollection<any> = this.afs.collection('carts', ref => ref.where('id_user', '==', this.auhtService.user.uid));
    return cartRef.get();
  }
  
  GetProductsCart(id) {
    return this.afs.doc(`carts/${id}`).get();
  } 

  GetProducts(id): any {
    const cartRef = this.afs.collection('products', ref => ref.where('id', '==', id)).valueChanges({ idField: 'uid' });
    return cartRef
  } 


  SetCartData(cart) {
    this.getCart().subscribe(valcart  => {
      const cartRef: AngularFirestoreDocument<any> = this.afs.doc(`carts/${valcart.docs[0].id}`);
      cartRef.get().subscribe(val => {
        const actual = val.data().products;
        actual.push(cart)
        const cartData = {
          id: cart.id,
          status: 'Pending',
          products: actual
        }
        return cartRef.set(cartData, {
          merge: true
      });
      });
    });
  }

  deleteCartData(cart) {
    this.getCart().subscribe(valcart  => {
      const cartRef: AngularFirestoreDocument<any> = this.afs.doc(`carts/${valcart.docs[0].id}`);
      cartRef.get().subscribe(val => {
        const actual = val.data().products;
        actual.forEach((element, index) => {
          if (element.id === cart.id) {
            actual.splice(index, 1);
          }
        });
        
        const cartData = {
          id: cart.id,
          status: 'Pending',
          products: actual
        }
        return cartRef.set(cartData, {
          merge: true
      });
      });
    });
  }

  validateCartData(cart) {
    this.getCart().subscribe(valcart  => {
      const cartRef: AngularFirestoreDocument<any> = this.afs.doc(`carts/${valcart.docs[0].id}`);
      cartRef.get().subscribe(val => {
        const actual = val.data().products;
        actual.forEach((element, index) => {
          if (element.id === cart.id) {
            element.quantity = cart.quantity
          }
        });
        const cartData = {
          id: cart.id,
          status: 'Completed',
          products: actual
        }
        return cartRef.set(cartData, {
          merge: true
      });
      });
    });
  }

}
