import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
import { CoreRoutingModule } from './core-routing.module';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfidentialiteComponent,
    MentionsLegalesComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  
  exports:
  [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
