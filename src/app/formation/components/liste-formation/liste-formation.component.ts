import { Component, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router } from '@angular/router';
import { Formation } from '../../models/formation';
import { Image } from '../../models/image';

import { CookieServices } from 'src/app/cookie.service';
import { NgIfContext } from '@angular/common';

import * as AOS from 'aos';
import { Connexion } from '../../models/connexion';
import { Deconnexion } from '../../models/deconnexion';
import { FormationService } from '../../services/formation.services';

@Component({
  selector: 'app-liste-formation',
  templateUrl: './liste-formation.component.html',
  styleUrls: ['./liste-formation.component.scss']
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
   /*
      this.http.get<Formation[]>('https://franceétudes.com:3000//api/liste/formation').subscribe(reponse  => 
      {
        this.formations = reponse;
        console.log(reponse)
      }
      );

      this.http.get<Image[]>('https://franceétudes.com:3000//api/liste/imagecomplet').subscribe(reponse  => 
      {
        this.images = reponse;
      }
      );
*/


      this.http.get<any[]>('https://franceétudes.com:3000//api/nombre_utilisateur').subscribe(reponse  => 
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
         }, 5000); 



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
}
