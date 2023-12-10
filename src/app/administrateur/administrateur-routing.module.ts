import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AjoutFormationComponent } from "./components/ajout-formation/ajout-formation.component";
import { ModifierFormationComponent } from "./components/modifier-formation/modifier-formation.component";
import { EnvoiMailComponent } from "./components/envoi-mail/envoi-mail.component";
import { AjoutPayantComponent } from "./components/ajout-payant/ajout-payant.component";
import { AbonnementComponent } from "./components/abonnement/abonnement.component";

const routes : Routes =
[
 {path : 'ajout', component : AjoutFormationComponent},
 {path :'ajout_payant', component : AjoutPayantComponent },
 {path : 'abonnement', component : AbonnementComponent},
 {path : 'modifier/:id', component: ModifierFormationComponent},
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