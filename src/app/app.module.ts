import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SafePipe } from './safe.pipe';
import { AccueilComponent } from './accueil/accueil.component';

import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    CoreModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
