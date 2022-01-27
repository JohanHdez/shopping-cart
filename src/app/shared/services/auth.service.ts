import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { NzModalService } from 'ng-zorro-antd/modal';
// import { increment, decrement, reset } fro../../app.actionsons';
import { Store } from '@ngrx/store';
import { createSession, removeSession } from 'src/app/app.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth, 
    public router: Router,  
    public ngZone: NgZone,
    public modal  : NzModalService,
    private store: Store<{ auth: any }>
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      }
    })
   
  }

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['store']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        this.modal.error({
          nzTitle: 'This is an error message',
          nzContent: error.message
        });
      })
  }


  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.router.navigate(['store']);
      }).catch((error) => {
        this.modal.error({
          nzTitle: 'This is an error message',
          nzContent: error.message
        });
      })
  }

  signOut() {
    this.afAuth.signOut().then(()=>{
     localStorage.removeItem('user');
      this.store.dispatch(removeSession());
      this.router.navigate(['login']);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!) || null;
    return (user != null) ? true : false;
  }

  get user(): any {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    this.afs.collection('carts').add({
      id_user:user.uid,
      products:[],
      status: 'Pending'
    })
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    this.store.dispatch(createSession({user: userData}));
    return userRef.set(userData, {
      merge: true
    })
  }



}
