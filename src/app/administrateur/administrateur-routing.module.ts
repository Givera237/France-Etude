import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AjoutFormationComponent } from "./components/ajout-formation/ajout-formation.component";
import { ModifierFormationComponent } from "./components/modifier-formation/modifier-formation.component";

const routes : Routes =
[
 {path: 'ajout', component : AjoutFormationComponent},
 {path: 'modifier', component : ModifierFormationComponent},
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