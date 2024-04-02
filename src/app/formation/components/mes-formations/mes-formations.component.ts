import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as AOS from 'aos';
import { CookieServices } from 'src/app/cookie.service';
import { ImageRepertoire } from '../../models/image_repertoire';
import { Repertoire } from '../../models/repertoire';

@Component({
  selector: 'app-mes-formations',
  templateUrl: './mes-formations.component.html',
  styleUrls: ['./mes-formations.component.scss']
})
export class MesFormationsComponent 
{
  repertoires !: Repertoire[];
  images!: ImageRepertoire[];
  nom !: string;
  pseudo!: string

  constructor(
    private http : HttpClient,
    private cookieService: CookieServices,
    private router : Router ){}

    ngOnInit(): void
    {
      AOS.init();
      this.pseudo = this.cookieService.getCookie('pseudo');

      this.http.get<Repertoire[]>(`https://franceétudes.com:3000/api/liste/formation_paye/${this.pseudo}`).subscribe(reponse  => 
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
      this.router.navigateByUrl(`admin/formation_payante/${id_formation}`);
    
    }
}
