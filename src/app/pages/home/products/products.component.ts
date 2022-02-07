import { Component, OnInit } from '@angular/core';
import { StoreService } from '@shared/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productsList:Array<any> = [];
  
  constructor(private service: StoreService) {
    service.GetProductsList().subscribe(result => {
      result.forEach((doc)=>{
        let item = doc.data();
        this.productsList.push({...item, uid:doc.id})
      })
    } );
  }

  ngOnInit(): void {  
  }

}
