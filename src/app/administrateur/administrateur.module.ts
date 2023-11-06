import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutFormationComponent } from './components/ajout-formation/ajout-formation.component';
import { AdministrateurRoutingModule } from './administrateur-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifierFormationComponent } from './components/modifier-formation/modifier-formation.component';
import { EnvoiMailComponent } from './components/envoi-mail/envoi-mail.component';



@NgModule({
  declarations: [
    AjoutFormationComponent,
    ModifierFormationComponent,
    EnvoiMailComponent
  ],
  imports: 
  [
    CommonModule,
    AdministrateurRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdministrateurModule 
{ }
