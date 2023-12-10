import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutFormationComponent } from './components/ajout-formation/ajout-formation.component';
import { AdministrateurRoutingModule } from './administrateur-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifierFormationComponent } from './components/modifier-formation/modifier-formation.component';
import { EnvoiMailComponent } from './components/envoi-mail/envoi-mail.component';
import { AjoutPayantComponent } from './components/ajout-payant/ajout-payant.component';
import { AbonnementComponent } from './components/abonnement/abonnement.component';



@NgModule({
  declarations: [
    AjoutFormationComponent,
    ModifierFormationComponent,
    EnvoiMailComponent,
    AjoutPayantComponent,
    AbonnementComponent
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
