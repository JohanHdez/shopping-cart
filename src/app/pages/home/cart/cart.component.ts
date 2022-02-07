import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { resetProducts } from 'app/app.actions';
import { StoreService } from '@shared/services/store.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts = [];
  cutValue = 1;
  cart: Observable<any[]>
  showproducts = [];
  cartsList;
  constructor(private store: Store<{cart:any}>, 
    private storeSrvice: StoreService,
    public router: Router,
    private notification: NzNotificationService,) {
    store.select('cart').subscribe(val => {
      this.showproducts = val.products;
    });
   }

  ngOnInit(): void {}
  completedCart(){
    this.notification.create(
      'success',
      'Carrito completado',
      'El carrito ha pasado de estado pendiente a completado'
    );
    this.store.dispatch(resetProducts())
    this.storeSrvice.completedCart();
    this.router.navigate(['']);
  }

}


