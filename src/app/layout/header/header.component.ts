import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  count = []

  constructor(
    private authService: AuthService,
    private store: Store<{ count: number, auth: any }>,
    private storecount: Store<{cart:any}>
  ) {
    this.countCart$ = this.storecount.select('cart')
    this.countCart$.subscribe(val => {
      this.count.push(val);
      this.count.filter(Boolean);
    });
    this.session$ = store.select('auth');
    this.session$.subscribe(value => this.session = value);
    
    this.isLoggedIn = this.authService.isLoggedIn;
    if(this.isLoggedIn) this.user = this.authService.user;
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this.isLoggedIn = false;
    this.authService.signOut();
  }

}
