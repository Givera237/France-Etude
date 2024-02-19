import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Formation } from '../../models/formation';
import { Image } from '../../models/image';

import * as AOS from 'aos';
import { CookieServices } from 'src/app/cookie.service';
import { Repertoire } from '../../models/repertoire';
import { ImageRepertoire } from '../../models/image_repertoire';

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

  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private cookieService: CookieServices,
    private router : Router ){}

    ngOnInit(): void
    {
      AOS.init();
      this.admin = this.cookieService.getCookie('status');


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
}
