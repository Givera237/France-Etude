import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RdvFormComponent } from "./components/rdv-form/rdv-form.component";
import { CreneauxDispoComponent } from "./components/creneaux-dispo/creneaux-dispo.component";
import { ListeReservationComponent } from "./components/liste-reservation/liste-reservation.component";
import { EntrerCreneauComponent } from "./components/entrer-creneau/entrer-creneau.component";
import { ListeRdvComponent } from "./components/liste-rdv/liste-rdv.component";
import { JoursIndisponiblesComponent } from "./components/jours-indisponibles/jours-indisponibles.component";
import { AjoutJourIndisponibleComponent } from "./components/ajout-jour-indisponible/ajout-jour-indisponible.component";
import { CreerCreneauInitialComponent } from "./components/creer-creneau-initial/creer-creneau-initial.component";
import { ConfirmeRdvComponent } from "./components/confirme-rdv/confirme-rdv.component";

const routes : Routes =
[
    {path : 'rdv_form', component : RdvFormComponent},
    {path : 'creneau', component : CreneauxDispoComponent},
    {path : 'liste', component : ListeReservationComponent},
    {path : 'entrer_creneau', component : EntrerCreneauComponent},
    {path : 'creer_creneau', component : CreerCreneauInitialComponent},
    {path : 'mes_rdv', component : ListeRdvComponent },
    {path : 'liste_indisponible', component : JoursIndisponiblesComponent},
    {path : 'ajout_jour_indispo', component : AjoutJourIndisponibleComponent},
    {path : 'confirmation-rdv/:id', component : ConfirmeRdvComponent}
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

export class RendezVousRoutingModule
{

}