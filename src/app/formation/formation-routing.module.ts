import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListeFormationComponent } from "./liste-formation/liste-formation.component";
import { FormationUniqueComponent } from "./formation-unique/formation-unique.component";

const routes : Routes =
[
    {path : 'liste', component: ListeFormationComponent},
    {path : 'unique', component: FormationUniqueComponent}

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