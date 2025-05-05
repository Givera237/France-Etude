import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampusFranceComponent } from './campus-france/campus-france.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { PresentationRoutingModule } from './presentation-routing.module';
import { VisaComponent } from './visa/visa.component';
import {MatCardModule} from '@angular/material/card';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CampusFranceComponent,
    AProposComponent,
    VisaComponent,
    ContactComponent,
    FaqsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    PresentationRoutingModule
  ]
})
export class PresentationModule { }
