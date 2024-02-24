import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '../../models/video';
import { CookieServices } from 'src/app/cookie.service';
import { FormationService } from '../../services/formation.services';
import { Pdf } from 'src/app/administrateur/models/pdf';
@Component({
  selector: 'app-formation-unique',
  templateUrl: './formation-unique.component.html',
  styleUrls: ['./formation-unique.component.scss']
})
export class FormationUniqueComponent 
{
  videos !: Video[];
  pdf!: Pdf[];
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
      );

      this.http.get<Pdf[]>(`http://localhost:3000/api/liste/Pdf_formation/${id_formation}`).subscribe(reponse  => 
      {
        this.pdf = reponse;
        console.log('les pdfs :', this.pdf);
      }
      );
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
    
    addPdf()
    {
      const id_formation = +this.route.snapshot.params['id'];
      this.router.navigateByUrl(`admin/ajout_pdf/${id_formation}`);
    }

    onDeletePdf(id : number)
    {
      this.formation.supprimerPdf(id)
    }
}
