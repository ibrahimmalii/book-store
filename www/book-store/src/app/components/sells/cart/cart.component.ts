import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  images:string='Mobile';
  price: number = 32434;
  total: number = 32434;

  constructor() { }

  ngOnInit(): void {

  }

  getQuantity(title: any){
    this.total = title * this.price
    console.log(this.total)
  }

}
