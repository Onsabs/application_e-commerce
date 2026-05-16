import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { PromotionListComponent } from './features/promotions/promotion-list/promotion-list.component';
import { PromotionFormComponent } from './features/promotions/promotion-form/promotion-form.component';
import { CategoryFormComponent } from './features/categories/category-form/category-form.component';
import { LivraisonListComponent } from './features/livraison/livraison-list/livraison-list.component';
import { OrderDetailsComponent } from './features/orders/order-details/order-details.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';
import { PaymentListComponent } from './features/payments/payment-list/payment-list.component';
import { ReviewListComponent } from './features/reviews/review-list/review-list.component';
import { UserDetailsComponent } from './features/users/user-details/user-details.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'promotion-form', component: PromotionFormComponent },
      { path: 'promotion-list', component: PromotionListComponent },
      { path: 'category-form', component: CategoryFormComponent },
      { path: 'promotion-list', component: PromotionListComponent },
      { path: 'category-list', component: CategoryListComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-form', component: ProductFormComponent },
      {path: 'product-form/:id',component: ProductFormComponent},

      { path: 'livraison-list', component: LivraisonListComponent },
      { path: 'order-details', component: OrderDetailsComponent },
      { path: 'order-list', component: OrderListComponent },
      { path: 'payment-list', component: PaymentListComponent },
      { path: 'review-list', component: ReviewListComponent },
      { path: 'user-details', component: UserDetailsComponent },
      { path: 'user-list', component: UserListComponent },

    ]
  },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
