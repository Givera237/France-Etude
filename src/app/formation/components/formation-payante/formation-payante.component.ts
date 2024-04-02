import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import * as AOS from 'aos';
import { CookieServices } from 'src/app/cookie.service';
import { Repertoire } from '../../models/repertoire';
import { ImageRepertoire } from '../../models/image_repertoire';
import { Objet } from '../../models/objet';
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
    private http : HttpClient,
    private cookieService: CookieServices,
    private formation : FormationService,
    private router : Router ){}

    ngOnInit(): void
    {
      AOS.init();
      this.admin = this.cookieService.getCookie('status');
      this.pseudo = this.cookieService.getCookie('pseudo');

      this.http.get<Repertoire[]>('https://franceétudes.com:3000/api/liste/repertoire').subscribe(reponse  => 
      {
        this.repertoires = reponse;
      }
      );
      this.http.get<ImageRepertoire[]>('https://franceétudes.com:3000/api/liste/imagepayantescomplet').subscribe(reponse  => 
      {
        this.images = reponse;
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

    }
}
