import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfidentialiteComponent } from "./confidentialite/confidentialite.component";
import { MentionsLegalesComponent } from "./mentions-legales/mentions-legales.component";


const routes : Routes =
[   
    {path : 'confidentialite',component : ConfidentialiteComponent},
    {path : 'mentions légales',component : MentionsLegalesComponent}
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

export class CoreRoutingModule
{

}