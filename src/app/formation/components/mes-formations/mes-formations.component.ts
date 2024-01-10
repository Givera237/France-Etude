import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Formation } from '../../models/formation';
import { Image } from '../../models/image';

import * as AOS from 'aos';
import { CookieService } from 'src/app/cookie.service';

@Component({
  selector: 'app-mes-formations',
  templateUrl: './mes-formations.component.html',
  styleUrls: ['./mes-formations.component.scss']
})
export class MesFormationsComponent 
{
  formations !: Formation[];
  images!: Image[];
  nom !: string;
  email!: string

  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private cookieService: CookieService,
    private router : Router ){}

    ngOnInit(): void
    {
      AOS.init();
      this.email = this.cookieService.getCookie('email');

      this.http.get<Formation[]>(`http://localhost:3000/api/liste/formation_paye/${this.email}`).subscribe(reponse  => 
      {
        this.formations = reponse;
        console.log('Yo bro voici tes objets', reponse);
        console.log(this.formations.length)
      }
      );
      this.http.get<Image[]>('http://localhost:3000/api/liste/imagecomplet').subscribe(reponse  => 
      {
        this.images = reponse;
        console.log('Yo bro voici tes images', reponse);

      }
      )
    }

    onViewFormation(id_formation : number) : void
    {
      this.router.navigateByUrl(`formation/${id_formation}`);
     /* if(environment.connexion === 1)
      {
        this.router.navigateByUrl(`formation/${id_formation}`);

      }
      else
      {
        this.router.navigateByUrl(`authentification/connexion`);
      } */
    }
}
