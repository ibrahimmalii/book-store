import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { InformationComponent } from './information/information.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'information', component: InformationComponent},
  {path: 'pay', component: PaymentComponent},
  {path: '', component: CartComponent}
]

@NgModule({
  declarations: [
    CartComponent,
    PaymentComponent,
    InformationComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SellsModule { }
export interface Countries {
  code: string
  code3: string
  name: string
  number: string
}

