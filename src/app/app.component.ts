import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createSession } from './app.actions';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (private authService: AuthService,
    private store: Store<{ auth: any }>,){
    
  }

  ngOnInit():void {
    const user = this.authService.user;
    if(Object.keys(user).length != 0) this.store.dispatch(createSession({user: user}))
  }
}