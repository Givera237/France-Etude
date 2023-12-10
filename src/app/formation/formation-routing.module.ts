import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListeFormationComponent } from "./components/liste-formation/liste-formation.component";
import { FormationUniqueComponent } from "./components/formation-unique/formation-unique.component";
import { FormationPayanteComponent } from "./components/formation-payante/formation-payante.component";
import { MesFormationsComponent } from "./components/mes-formations/mes-formations.component";

const routes : Routes =
[
    {path : 'liste', component: ListeFormationComponent},
    {path : 'payante', component: FormationPayanteComponent},
    {path : 'mes_formations', component: MesFormationsComponent},
    {path : ':id', component: FormationUniqueComponent},
    

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

export class FormationRoutingModule
{

}