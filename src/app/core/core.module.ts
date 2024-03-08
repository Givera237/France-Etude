import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
import { CoreRoutingModule } from './core-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfidentialiteComponent
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
