import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListeFormationComponent } from "./components/liste-formation/liste-formation.component";
import { FormationUniqueComponent } from "./components/formation-unique/formation-unique.component";

const routes : Routes =
[
    {path : 'liste', component: ListeFormationComponent},
    {path : ':id', component: FormationUniqueComponent}

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