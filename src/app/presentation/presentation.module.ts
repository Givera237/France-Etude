import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampusFranceComponent } from './campus-france/campus-france.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { PresentationRoutingModule } from './presentation-routing.module';
import { VisaComponent } from './visa/visa.component';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [
    CampusFranceComponent,
    AProposComponent,
    VisaComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PresentationRoutingModule
  ]
})
export class PresentationModule { }
