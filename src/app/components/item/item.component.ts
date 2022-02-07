import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { addProduct, updateProduct } from 'app/app.actions';
import { Product } from '@shared/models/product.model';
import { StoreService } from '@shared/services/store.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public isVisible = false;
  public isConfirmLoading = false;
  public session$: Observable<any>;
  public isLoggedIn = false;
  public session = null;
  public quantity = 0;
  public productList = new Array();

  @Input() data: Product;

  constructor(private notification: NzNotificationService, 
    private store: Store<{ cart: any, auth: any }>,
    private storeService: StoreService,
    ) {
      this.session$ = store.select('auth');
      this.session$.subscribe(value => {
        this.session = value
        this.isLoggedIn = value.isLoggedIn;
      });
      store.select('cart').subscribe(val => {
        this.productList = val.products;
        this.productList = JSON.parse(JSON.stringify(this.productList));
        
      });
     }

  ngOnInit(): void {
  }

  public addToCart(product):void {
    let item;
    let indice = this.productList.findIndex(({id}) => id === product.id)
    if(indice == -1){
      item = {
        ...product,
        quantity: this.quantity
      }
      this.store.dispatch(addProduct({product: item}))
    
    }else{
      const data = this.productList.filter(item => {
        return item.id != product.id
      })
      item = {
        ...product,
        quantity: this.productList[indice].quantity + this.quantity
      }
      data.push(item)
      this.store.dispatch(updateProduct({product: data}))
    }
    this.storeService.SetCartData(item);
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 1000);
    /*
    let item = this.productList.findIndex(({id}) => id === product.id)
    if (item !== -1) {
     
    } else {
      //this.productList.push(product)
    }
    this.notification.create(
      'success',
      'Producto agregado',
      'Se ha agregado correctamente el producto al carrito de compras.'
    );
    
    this.store.dispatch(addProduct({product: this.productList}))
   
*/
  }

  showModal(): void {
    this.isVisible = true;
  }


  handleCancel(): void {
    this.isVisible = false;
  }

}
