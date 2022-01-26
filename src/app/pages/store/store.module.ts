import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { ProductComponent } from 'src/app/components/product/product.component';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { StoreService } from '../../shared/services/store.service';
@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [StoreComponent, ProductComponent],
  exports: [StoreComponent],
  providers: [StoreService]
})
export class StoreModule { }
