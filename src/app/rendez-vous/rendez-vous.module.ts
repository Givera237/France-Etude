import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RdvFormComponent } from './components/rdv-form/rdv-form.component';
import { RendezVousRoutingModule } from './rendez-vous-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreneauxDispoComponent } from './components/creneaux-dispo/creneaux-dispo.component';
import {MatListModule} from '@angular/material/list';
import { ListeReservationComponent } from './components/liste-reservation/liste-reservation.component';
import { EntrerCreneauComponent } from './components/entrer-creneau/entrer-creneau.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ListeRdvComponent } from './components/liste-rdv/liste-rdv.component';





@NgModule({
  declarations: 
  [
    RdvFormComponent,
    CreneauxDispoComponent,
    ListeReservationComponent,
    EntrerCreneauComponent,
    ListeRdvComponent,
  ],
  imports: 
  [
    CommonModule,
    DatePipe,
    RendezVousRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BsDatepickerModule.forRoot()
  ]
})
export class RendezVousModule { }
