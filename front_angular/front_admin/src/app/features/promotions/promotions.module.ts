import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionsComponent } from './promotions.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionFormComponent } from './promotion-form/promotion-form.component';


@NgModule({
  declarations: [
    PromotionsComponent,
    PromotionListComponent,
    PromotionFormComponent
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule
  ]
})
export class PromotionsModule { }
