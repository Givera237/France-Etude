import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AjoutFormationComponent } from "./components/ajout-formation/ajout-formation.component";
import { ModifierFormationComponent } from "./components/modifier-formation/modifier-formation.component";
import { EnvoiMailComponent } from "./components/envoi-mail/envoi-mail.component";
import { AjoutPayantComponent } from "./components/ajout-payant/ajout-payant.component";
import { AbonnementComponent } from "./components/abonnement/abonnement.component";
import { FormationPayanteComponent } from "./components/formation-payante/formation-payante.component";
import { UploadVideoPayanteComponent } from "./components/upload-video-payante/upload-video-payante.component";
import { UploadPdfComponent } from "./components/upload-pdf/upload-pdf.component";
import { ListeVideoComponent } from "./components/liste-video/liste-video.component";
import { ListePdfComponent } from "./components/liste-pdf/liste-pdf.component";
import { ListeAbonnementComponent } from "./components/liste-abonnement/liste-abonnement.component";
import { ModifierRepertoireComponent } from "./components/modifier-repertoire/modifier-repertoire.component";

const routes : Routes =
[
 {path : 'ajout', component : AjoutFormationComponent},
 {path :'ajout_payant', component : AjoutPayantComponent },
 {path : 'formation_payante/:id', component : FormationPayanteComponent},
 {path : 'up_video/:id', component : UploadVideoPayanteComponent},
 {path : 'up_pdf/:id', component : UploadPdfComponent},
 {path : 'liste_video/:id', component : ListeVideoComponent},
 {path : 'liste_pdf', component : ListePdfComponent},
 {path : 'liste_abonne/:id', component : ListeAbonnementComponent},
 {path : 'abonnement', component : AbonnementComponent},
 {path : 'modifier/:id', component: ModifierFormationComponent},
 {path : 'modifier_repertoire/:id', component: ModifierRepertoireComponent},
 {path : 'mail', component : EnvoiMailComponent}

]

@NgModule
(
    {
        imports : 
        [
            RouterModule.forChild(routes)
        ],
        exports: 
        [
            RouterModule
        ]
    }
)

export class AdministrateurRoutingModule
{

}