import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// COMPONENTS
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';

// PAGES
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

import { HistoriqueComponent } from './pages/historique/historique.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { HistoryDetailsComponent } from './pages/history-details/history-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,

    // layout
    HeaderComponent,
    FooterComponent,
    LayoutComponent,

    // pages
    HomeComponent,
    CartComponent,
    ProductsComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    ProfileComponent,
    FavoritesComponent,
    ContactComponent,
    EditProfileComponent,
    OrderSuccessComponent,
    HistoriqueComponent,
    HistoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
