import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Formation } from '../../models/formation';
import { Image } from '../../models/image';

import * as AOS from 'aos';

@Component({
  selector: 'app-liste-formation',
  templateUrl: './liste-formation.component.html',
  styleUrls: ['./liste-formation.component.scss']
})
export class ListeFormationComponent 
{
  formations !: Formation[];
  images!: Image[];
  nom !: string;

  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private router : Router ){}

    ngOnInit(): void
    {
      AOS.init();

      this.http.get<Formation[]>('http://localhost:3000/api/liste/formation').subscribe(reponse  => 
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

    onViewFormation(titre_formation : string) : void
    {
     this.router.navigateByUrl(`formation/${titre_formation}`);
    }
}
