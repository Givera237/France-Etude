import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampusFranceComponent } from './campus-france/campus-france.component';
import { AProposComponent } from './a-propos/a-propos.component';



@NgModule({
  declarations: [
    CampusFranceComponent,
    AProposComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PresentationModule { }
