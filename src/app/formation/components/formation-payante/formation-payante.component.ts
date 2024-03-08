import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Formation } from '../../models/formation';
import { Image } from '../../models/image';

import * as AOS from 'aos';
import { CookieServices } from 'src/app/cookie.service';
import { Repertoire } from '../../models/repertoire';
import { ImageRepertoire } from '../../models/image_repertoire';
import { Objet } from '../../models/objet';
import { AgRichSelect } from 'ag-grid-community';
import { FormationService } from '../../services/formation.services';

@Component({
  selector: 'app-formation-payante',
  templateUrl: './formation-payante.component.html',
  styleUrls: ['./formation-payante.component.scss']
})
export class FormationPayanteComponent
{
  repertoires !: Repertoire[];
  images!: ImageRepertoire[];
  nom !: string;
  admin!: string;
  pseudo!: string;
  obj!: FormData
  prix!: string
  objet!: Objet

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
      this.pseudo = this.cookieService.getCookie('pseudo');

      this.http.get<Repertoire[]>('http://localhost:3000/api/liste/repertoire').subscribe(reponse  => 
      {
        this.repertoires = reponse;
        console.log('payante ', this.repertoires )
      }
      );
      this.http.get<ImageRepertoire[]>('http://localhost:3000/api/liste/imagepayantescomplet').subscribe(reponse  => 
      {
        this.images = reponse;
        console.log('image ', this.images )
      }
      )
    }

    onViewFormation(id_formation : number) : void
    {
      if(this.admin === '1')
      {
        this.router.navigateByUrl(`admin/formation_payante/${id_formation}`); 
      }
      else
      {

      }
    }

     onRedirect(titre_formation : string, prix_number : number)
    {
        const titre =  titre_formation
        const prix =  prix_number;
        const pseudo = this.cookieService.getCookie('pseudo');

        const maConstante = 
        {
          titre_formation : titre ,
          prix: prix,
          pseudo: pseudo,
        };

        this.formation.envoieMessge(maConstante)
/*
        this.http.post(`http://localhost:3000/api/mail_demande_abonnement`, maConstante, { observe: 'response' }).subscribe
        (
          (response: HttpResponse<any>) => 
          {
            if (response.status === 200) 
            {
              console.log(response.statusText)
              console.log(maConstante)
              //this.router.navigateByUrl(`formation`);
            }
            else 
            {
              console.log('merde combi');
            }
          },
          error => 
          {
            console.error(error); // Afficher l'erreur à l'utilisateur
          }
        )     
*/
    }
}
