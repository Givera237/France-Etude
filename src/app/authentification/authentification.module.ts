import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerificationEmailComponent } from './components/verification-email/verification-email.component';
import { AfficheErreurComponent } from './components/affiche-erreur/affiche-erreur.component';
import { EntreEmailPerduComponent } from './components/entre-email-perdu/entre-email-perdu.component';
import { CodeEmailComponent } from './components/code-email/code-email.component';
import { NouvelIdentifiantComponent } from './components/nouvel-identifiant/nouvel-identifiant.component';



@NgModule({
  declarations: [
    InscriptionComponent,
    ConnexionComponent,
    VerificationEmailComponent,
    AfficheErreurComponent,
    EntreEmailPerduComponent,
    CodeEmailComponent,
    NouvelIdentifiantComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AuthentificationModule { }
