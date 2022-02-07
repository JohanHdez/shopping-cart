import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addProduct } from 'app/app.actions';
import { AuthService } from '@shared/services/auth.service';
import { StoreService } from '@shared/services/store.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  user = {email :''};
  session = null;
  countCart$: Observable<number>;
  count$: Observable<number>;
  session$: Observable<any>;
  cartSubscribe;
  sessionSubscribe;
  count = 0;

  constructor(
    private authService: AuthService,
    private store: Store<{ auth: any }>,
    private storecount: Store<{cart:any}>,
    private storeService: StoreService
  ) {
    this.countCart$ = this.storecount.select('cart')
    this.cartSubscribe = this.countCart$.subscribe(val => {
      const data: any = val;
      this.count = data.products.length;
    });
    this.session$ = store.select('auth');
    this.session$.subscribe(value => {
      this.session = value
      this.isLoggedIn = value.isLoggedIn;
      if(this.isLoggedIn) {
        this.user = value.user;
        this.getCart(value.user.uid);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      // this.cartSubscribe.unsubscribe();
      // this.sessionSubscribe.unsubscribe();
  }

  signOut(): void {
    this.isLoggedIn = false;
    this.authService.signOut();
  }

  getCart(uid=null) {
    this.storeService.getCart(uid).subscribe(val  => {
      this.storeService.GetProductsCart(val.docs[0].id).subscribe(item => {
        const data: any = item.data()
        data.products.forEach(element => {
          this.store.dispatch(addProduct({product: element}))
        });
       this.count = data.products.length;
      })
    });
    
  }

}
