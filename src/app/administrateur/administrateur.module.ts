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
import { FormationPayanteComponent } from './components/formation-payante/formation-payante.component';
import { UploadVideoPayanteComponent } from './components/upload-video-payante/upload-video-payante.component';
import { UploadPdfComponent } from './components/upload-pdf/upload-pdf.component';
import { ListeVideoComponent } from './components/liste-video/liste-video.component';
import { ListePdfComponent } from './components/liste-pdf/liste-pdf.component';
import { ModifierRepertoireComponent } from './components/modifier-repertoire/modifier-repertoire.component';
import { AjoutPdfGratuitComponent } from './components/ajout-pdf-gratuit/ajout-pdf-gratuit.component';
import { AjoutVideoGratuiteComponent } from './components/ajout-video-gratuite/ajout-video-gratuite.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';




@NgModule({
  declarations: [
    AjoutFormationComponent,
    ModifierFormationComponent,
    EnvoiMailComponent,
    AjoutPayantComponent,
    AbonnementComponent,
    FormationPayanteComponent,
    UploadVideoPayanteComponent,
    UploadPdfComponent,
    ListeVideoComponent,
    ListePdfComponent,
    ModifierRepertoireComponent,
    AjoutPdfGratuitComponent,
    AjoutVideoGratuiteComponent
  ],
  imports: 
  [
    CommonModule,
    AdministrateurRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule

  ]
})
export class AdministrateurModule 
{ }
