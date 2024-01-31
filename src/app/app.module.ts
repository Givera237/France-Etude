import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SafePipe } from './safe.pipe';
import { AccueilComponent } from './accueil/accueil.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListeAbonnementComponent } from './administrateur/components/liste-abonnement/liste-abonnement.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ListeAbonnementComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
