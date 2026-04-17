import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import { BadgeStatusComponent } from './components/badge-status/badge-status.component';



@NgModule({
  declarations: [
    TableComponent,
    ModalComponent,
    BadgeStatusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
