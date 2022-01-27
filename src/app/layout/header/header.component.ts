import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/shared/services/store.service';
import { addProduct, removeProduct } from 'src/app/app.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user = {email :''};
  session = null;
  countCart$: Observable<number>;
  count$: Observable<number>;
  session$: Observable<any>;

  count = 0;

  constructor(
    private authService: AuthService,
    private store: Store<{ count: number, auth: any }>,
    private storecount: Store<{cart:any}>,
    private storeSrvice: StoreService
  ) {
    this.countCart$ = this.storecount.select('cart')
    this.countCart$.subscribe(val => {
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

  signOut(): void {
    this.isLoggedIn = false;
    this.authService.signOut();
  }

  getCart(uid=null) {
    this.storeSrvice.getCart(uid).subscribe(val  => {
      this.storeSrvice.GetProductsCart(val.docs[0].id).subscribe(item => {
        const data: any = item.data()
        data.products.forEach(element => {
          this.store.dispatch(addProduct({produts: element}))
        });
       this.count = data.products.length;
      })
    });
    
    
  }

}
