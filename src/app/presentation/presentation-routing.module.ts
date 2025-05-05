import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CampusFranceComponent } from "./campus-france/campus-france.component";
import { AProposComponent } from "./a-propos/a-propos.component";
import { VisaComponent } from "./visa/visa.component";
import { ContactComponent } from "./contact/contact.component";
import { FaqsComponent } from "./faqs/faqs.component";


const routes : Routes =
[
    {path : 'campus_france', component : CampusFranceComponent},
    {path : 'a_propos', component : AProposComponent},
    {path : 'visa', component : VisaComponent},
    {path : 'contact', component : ContactComponent},
    {path : 'faqs', component : FaqsComponent},
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