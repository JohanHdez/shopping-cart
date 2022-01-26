import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './pages/login/login.module';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CreateAccountModule } from './pages/create-account/create-account.module';

// ngrx related imports
import { StoreModule } from '@ngrx/store';
import { authReducer, cartsReducer } from './app.reducer';


registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    LoginModule,
    NgZorroAntdModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CreateAccountModule,
    StoreModule.forRoot({ auth: authReducer, cart: cartsReducer })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
