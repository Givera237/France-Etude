import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Formation } from '../../models/formation';
import { Image } from '../../models/image';

//import { CookieService } from 'ngx-cookie-service';
import { CookieService } from 'src/app/cookie.service';


import * as AOS from 'aos';
import { environment } from 'src/environments/environment.development';
import { Connexion } from '../../models/connexion';
import { Deconnexion } from '../../models/deconnexion';

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
  suppCookie!: any;
  
  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private cookieService: CookieService,
    private router : Router ){}

    ngOnInit(): void
    {
      AOS.init();
       this.admin = this.cookieService.getCookie('status');
       this.connexion = this.cookieService.getCookie('connexion');
      console.log(this.admin); 
      console.log(this.connexion);
      
      //this.cookieService.deleteCookie('username');


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
