import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InscriptionComponent } from "./components/inscription/inscription.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { VerificationEmailComponent } from "./components/verification-email/verification-email.component";
import { AfficheErreurComponent } from "./components/affiche-erreur/affiche-erreur.component";


const routes : Routes =
[
    {path : 'inscription', component : InscriptionComponent},
    {path : 'connexion', component : ConnexionComponent},
    {path : 'verification', component : VerificationEmailComponent},
    {path : 'erreur', component : AfficheErreurComponent}
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