import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public productsList:Array<any> = [];
  
  constructor(private service: StoreService) {
    service.GetProductsList().subscribe(result => {
      result.forEach((doc)=>{
        let item = doc.data();
        this.productsList.push({...item,uid:doc.id})
      })
    } );
  }

  ngOnInit(): void {  
  }

}
