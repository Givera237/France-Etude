import { Component, TemplateRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Formation } from '../../models/formation';
import { Image } from '../../models/image';

//import { CookieService } from 'ngx-cookie-service';
import { CookieServices } from 'src/app/cookie.service';
import { NgIfContext } from '@angular/common';



import * as AOS from 'aos';
import { environment } from 'src/environments/environment.development';
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
  connect!: Connexion;
  nom !: string;
  connexion!: string;
  deconnexion!: Deconnexion;
  admin!: string;
  session!: string;
  existe_pas!: TemplateRef<NgIfContext<boolean>>|null;
  non_connecte!: TemplateRef<NgIfContext<boolean>>|null;
  
  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private cookieService: CookieServices,
    private formation : FormationService,
    private router : Router ){}

    ngOnInit(): void
    {
      AOS.init();
       this.admin = this.cookieService.getCookie('status');
       this.connexion = this.cookieService.getCookie('connexion');
   
      this.http.get<Formation[]>('http://localhost:3000/api/liste/formation').subscribe(reponse  => 
      {
        this.formations = reponse;
      }
      );

      this.http.get<Image[]>('http://localhost:3000/api/liste/imagecomplet').subscribe(reponse  => 
      {
        this.images = reponse;
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
