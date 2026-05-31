import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HistoriqueComponent } from './pages/historique/historique.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { HistoryDetailsComponent } from './pages/history-details/history-details.component';
import { authGuard } from './guards/auth.guard';
import { FeaturedComponent } from './pages/featured/featured.component';
const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [

      { path: '', redirectTo: 'home', pathMatch: 'full' },

      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent,canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent ,canActivate: [authGuard]},
      { path: 'favorites', component: FavoritesComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'order-success', component: OrderSuccessComponent,canActivate: [authGuard] },
      { path: 'edit-profile', component: EditProfileComponent ,canActivate: [authGuard]},
      { path: 'historique', component: HistoriqueComponent,canActivate: [authGuard] },
      { path: 'history-details', component: HistoryDetailsComponent,canActivate: [authGuard] },
      {path:  'featured' , component:FeaturedComponent},

    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }