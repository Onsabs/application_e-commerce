import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) },
      { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
      { path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule) },
      { path: 'payments', loadChildren: () => import('./features/payments/payments.module').then(m => m.PaymentsModule) },
      { path: 'livraison', loadChildren: () => import('./features/livraison/livraison.module').then(m => m.LivraisonModule) },
      { path: 'reviews', loadChildren: () => import('./features/reviews/reviews.module').then(m => m.ReviewsModule) },
      { path: 'promotions', loadChildren: () => import('./features/promotions/promotions.module').then(m => m.PromotionsModule) },
    
     
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
