import { NgIfContext } from '@angular/common';
import AOS from 'aos';

import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { Connexion } from '../../models/connexion';
import { Deconnexion } from '../../models/deconnexion';
import { Formation } from '../../models/formation';
import { FormationService } from '../../service/formation.services';
import { Image } from '../../models/image';

@Component({
  selector: 'app-liste-formation',
  imports: [],
  templateUrl: './liste-formation.component.html',
  styleUrl: './liste-formation.component.scss'
})
export class ListeFormationComponent 
{
  formations !: Formation[];
  images!: Image[];
  nombre!:any[];
  connect!: Connexion;
  nom !: string;
  connexion!: string;
  deconnexion!: Deconnexion;
  admin!: string;
  token!: string
  session!: string;
  statutToken!: number
  existe_pas!: TemplateRef<NgIfContext<boolean>>|null;
  non_connecte!: TemplateRef<NgIfContext<boolean>>|null;
  
  constructor(
    private http : HttpClient,
    private cookieService: CookieServices,
    private formationService : FormationService,
    private router : Router ){}

  
    ngOnInit(): void
    {
      AOS.init();
       this.admin = this.cookieService.getCookie('status');
       this.connexion = this.cookieService.getCookie('connexion');

      this.http.get<any[]>('https://franceétudes.com:3000/api/nombre_utilisateur').subscribe((reponse: any[])  => 
      {
        this.nombre = reponse;
      }
      );

      setTimeout(() => 
        {
          this.formationService.getFormationListe().subscribe(
            (response: { status: any; body: any; statusText : any }) => 
              {
                console.log('Statut de la réponse:', response.status);
                console.log('Données:', response.body);
                this.formations = response.body;
                this.statutToken = response.status
              },
    
            (error: { status: any; body: any; statusText : any }) => 
              {
                console.error('Erreur lors de la requête:', error);
              /*  if (error.statusText === 'Unauthorized' )
                  {
                    this.cookieService.setConnexion(30, 'false');
                  } */
              } 
          );      
         }, 2); 



      this.formationService.getFormationImage().subscribe(
        (response: { status: any; body: any; }) => 
          {
            this.images = response.body;
          },

        (error: any) => 
          {
            console.error('Erreur lors de la requête:', error);
          }
      );

    }

  
    existe(variable: string): boolean 
    {
      return variable !== undefined && variable !== null;
    }

    onConnect()
    {
      this.router.navigateByUrl(`authentification/connexion`);
    }

    onViewFormation(id_formation : number) : void
    {
      if (this.connexion === 'true')
      {
        this.router.navigateByUrl(`formation/${id_formation}`); 

      }    
      else
      {
        this.router.navigateByUrl(`authentification/connexion`);
      }
    }

    mesFormations()
    {
      this.router.navigateByUrl(`formation/mes_formations`);
    }
}
