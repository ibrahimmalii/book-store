import { HomeComponent } from './components/main-page/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },{
    path: 'categories',
    loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule)
  },{
    path: 'sells',
    loadChildren: () => import('./components/sells/sells.module').then(m => m.SellsModule)
  },
  {path: 'orders/pay' , component: CardComponent}
,
  {
    path: '',
    loadChildren: () => import('./components/main-page/main-page.module').then(m => m.MainPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
