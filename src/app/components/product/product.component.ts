import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addProduct } from '../../app.actions';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() data = {id: null, name:'', description:'', url_img:''};

  constructor(
    private store: Store<{ cart: any }>,
    private storeService: StoreService
    ) { }

  ngOnInit() {
    this.getCart()
  }

  addToCart(product) {
    this.storeService.SetCartData(product);
    this.store.dispatch(addProduct({produts: product}))
  }

  getCart() {
    return this.storeService.getCart()
    .subscribe(result => {
      result.forEach((doc)=>{
        let item = doc.data();
      })
    } );
  }


}
