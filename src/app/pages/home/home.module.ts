import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NgZorroModule } from '../../shared/modules/ngzorro.module';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ItemComponent } from '../../components/item/item.component';
import { ItemCartComponent } from '../../components/item-cart/item-cart.component';
import { HistoryComponent } from './history/history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    CartComponent,
    ProductsComponent,
    HistoryComponent,
    ItemComponent,
    ItemCartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgZorroModule,
    ReactiveFormsModule,
    NzInputModule,
    // NgZorroAntdModule,
    // ScrollingModule,
    // DragDropModule,
  ]
})
export class HomeModule { }
