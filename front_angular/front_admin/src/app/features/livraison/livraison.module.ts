import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivraisonRoutingModule } from './livraison-routing.module';
import { LivraisonComponent } from './livraison.component';
import { LivraisonListComponent } from './livraison-list/livraison-list.component';


@NgModule({
  declarations: [
    LivraisonComponent,
    LivraisonListComponent
  ],
  imports: [
    CommonModule,
    LivraisonRoutingModule
  ]
})
export class LivraisonModule { }
