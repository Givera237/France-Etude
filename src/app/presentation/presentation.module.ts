import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampusFranceComponent } from './campus-france/campus-france.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { PresentationRoutingModule } from './presentation-routing.module';
import { VisaComponent } from './visa/visa.component';



@NgModule({
  declarations: [
    CampusFranceComponent,
    AProposComponent,
    VisaComponent
  ],
  imports: [
    CommonModule,
    PresentationRoutingModule
  ]
})
export class PresentationModule { }
