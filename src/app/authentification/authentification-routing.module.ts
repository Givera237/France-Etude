import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InscriptionComponent } from "./components/inscription/inscription.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";


const routes : Routes =
[
    {path : 'inscription', component : InscriptionComponent},
    {path : 'connexion', component : ConnexionComponent}
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

export class AuthentificationRoutingModule
{

}