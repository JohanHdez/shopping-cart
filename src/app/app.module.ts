import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from '@components/menu/menu.component';
import { HeaderComponent } from '@components/header/header.component';
import { NgZorroModule } from '@shared/modules/ngzorro.module';
import { FooterComponent } from '@components/footer/footer.component';
import { HomeComponent } from '@pages/home/home.component';
import { Error404Component } from '@pages/error404/error404.component';
import { LoginComponent } from '@pages/login/login.component';
import { CreateAccountComponent } from '@pages/create-account/create-account.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { icons } from '@shared/modules/icons.module';
import { environment } from '@environment/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { authReducer, cartsReducer } from './app.reducer';
// import { CarouselComponent } from './components/carousel/carousel.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    Error404Component,
    LoginComponent,
    CreateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NzIconModule.forRoot(icons),
    StoreModule.forRoot({ auth: authReducer, cart: cartsReducer })
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
