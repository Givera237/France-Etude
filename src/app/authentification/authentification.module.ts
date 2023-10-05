import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AuthentificationRoutingModule } from './authentification-routing.module';



@NgModule({
  declarations: [
    InscriptionComponent,
    ConnexionComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule
  ]
})
export class AuthentificationModule { }
