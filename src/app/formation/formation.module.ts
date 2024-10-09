import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeFormationComponent } from './components/liste-formation/liste-formation.component';
import { FormationUniqueComponent } from './components/formation-unique/formation-unique.component';
import { FormationRoutingModule } from './formation-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from '../safe.pipe';
import { FormationPayanteComponent } from './components/formation-payante/formation-payante.component';
import { MesFormationsComponent } from './components/mes-formations/mes-formations.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'; // Importer les données de localisation française



@NgModule({
  declarations: [
    ListeFormationComponent,
    FormationUniqueComponent,
    SafePipe,
    FormationPayanteComponent,
    MesFormationsComponent
  ],
  imports: [
    CommonModule,
    FormationRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],

})
export class FormationModule 
{
  constructor() {
    registerLocaleData(localeFr); // Enregistrer les données de localisation
  }
 }
