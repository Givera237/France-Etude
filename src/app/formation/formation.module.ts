import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeFormationComponent } from './components/liste-formation/liste-formation.component';
import { FormationUniqueComponent } from './components/formation-unique/formation-unique.component';
import { FormationRoutingModule } from './formation-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from '../safe.pipe';



@NgModule({
  declarations: [
    ListeFormationComponent,
    FormationUniqueComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    FormationRoutingModule,
    HttpClientModule
  ]
})
export class FormationModule { }
