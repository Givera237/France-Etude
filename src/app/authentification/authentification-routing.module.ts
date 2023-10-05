import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InscriptionComponent } from "./inscription/inscription.component";
import { ConnexionComponent } from "./connexion/connexion.component";


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