import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';


import { registerLocaleData } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import en from '@angular/common/locales/en';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CheckoutRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ScrollingModule,
    DragDropModule,
    CommonModule,
    FormsModule
  ],
  bootstrap: [ CheckoutComponent ],
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ]
})
export class CheckoutModule { }


