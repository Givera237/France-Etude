import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CampusFranceComponent } from "./campus-france/campus-france.component";
import { AProposComponent } from "./a-propos/a-propos.component";


const routes : Routes =
[
    {path : 'campus_france', component : CampusFranceComponent},
    {path : 'a_propos', component : AProposComponent}
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

export class PresentationRoutingModule
{

}