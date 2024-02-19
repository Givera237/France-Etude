import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '../../models/video';
import { CookieServices } from 'src/app/cookie.service';
import { FormationService } from '../../services/formation.services';
@Component({
  selector: 'app-formation-unique',
  templateUrl: './formation-unique.component.html',
  styleUrls: ['./formation-unique.component.scss']
})
export class FormationUniqueComponent 
{
  videos !: Video[];
  path !: string;
  admin!: string;

  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private router : Router,
    private cookieService: CookieServices,
    private formation : FormationService,
    private sanitizer: DomSanitizer ){}

    ngOnInit()
    {
      const id_formation = +this.route.snapshot.params['id'];
      this.admin = this.cookieService.getCookie('status');

      this.http.get<Video[]>(`http://localhost:3000/api/video/${id_formation}`).subscribe(reponse  => 
      {
        this.videos = reponse;
        console.log('Yo bro voici tes objets', reponse);
        //console.log(id_formation);
      }
      )
    }

    getSanitizedURL(path : string) 
    {
      return this.sanitizer.bypassSecurityTrustUrl(path);
    }

    supprimer()
    {
      const id_formation = +this.route.snapshot.params['id'];
      this.formation.supprimerFormationGratuite(id_formation);
      /*
      this.http.delete(`http://localhost:3000/api/formation/supprimer/${id_formation}`).subscribe(reponse  => 
      {
        console.log('Réponse : ', reponse),
        (error: any) => console.log('Erreur : ', error)
  
      }
      ) */
    }

    onViewFormation() : void
    {
     this.router.navigateByUrl(`formation/liste`);
    }

    onModifyFormation() : void
    {
      const id_formation = +this.route.snapshot.params['id'];
     this.router.navigateByUrl(`admin/modifier/${id_formation}`);
    }
}
