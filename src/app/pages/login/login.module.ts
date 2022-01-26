import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import en from '@angular/common/locales/en';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthService } from "../../shared/services/auth.service";

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ScrollingModule,
    DragDropModule
  ],
  declarations: [ LoginComponent ],
  bootstrap: [ LoginComponent ],
  providers: [ AuthService, { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ]
})

export class LoginModule { }
