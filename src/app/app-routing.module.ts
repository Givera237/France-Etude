import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = 
  [
    {path : '', component : AccueilComponent},
    {path: 'formation', loadChildren: () => import('./formation/formation.module').then (m => m.FormationModule) },
    {path: 'accueil', loadChildren: () => import('./presentation/presentation.module').then (m => m.PresentationModule) },
    {path: 'authentification', loadChildren: () => import('./authentification/authentification.module').then (m => m.AuthentificationModule) },
    {path: 'admin', loadChildren: ()  => import('./administrateur/administrateur.module').then (m => m.AdministrateurModule)},
    {path: 'rdve', loadChildren: ()  => import('./rendez-vous/rendez-vous.module').then (m => m.RendezVousModule)},
    {path: 'core', loadChildren: ()  => import('./core/core.module').then (m => m.CoreModule)}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
