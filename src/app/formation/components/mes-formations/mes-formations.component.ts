import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

import { CookieServices } from '../../../cookie.service';
import { ImageRepertoire } from '../../models/image_repertoire';
import { Repertoire } from '../../models/repertoire';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-formations',
  imports: [CommonModule],
  templateUrl: './mes-formations.component.html',
  styleUrl: './mes-formations.component.scss'
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
