import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeFormationComponent } from './liste-formation/liste-formation.component';
import { FormationUniqueComponent } from './formation-unique/formation-unique.component';



@NgModule({
  declarations: [
    ListeFormationComponent,
    FormationUniqueComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormationModule { }
