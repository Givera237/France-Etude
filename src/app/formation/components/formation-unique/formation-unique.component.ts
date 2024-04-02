import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '../../models/video';
import { CookieServices } from 'src/app/cookie.service';
import { FormationService } from '../../services/formation.services';
import { Pdf } from 'src/app/administrateur/models/pdf';
import { Formation } from '../../models/formation';
@Component({
  selector: 'app-formation-unique',
  templateUrl: './formation-unique.component.html',
  styleUrls: ['./formation-unique.component.scss']
})
export class FormationUniqueComponent 
{
  videos !: Video[];
  formations !: Formation[];
  pdf!: Pdf[];
  url!: any[]
  path !: string;
  admin!: string;
  id = +this.route.snapshot.params['id'];

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

      this.http.get<Formation[]>('https://franceétudes.com:3000/api/liste/formation').subscribe(reponse  => 
      {
        this.formations = reponse;
      }
      ); 
      this.http.get<Video[]>(`https://franceétudes.com:3000/api/video/${id_formation}`).subscribe(reponse  => 
      {
        this.videos = reponse;
      }
      );

      this.http.get<Pdf[]>(`https://franceétudes.com:3000/api/liste/Pdf_formation/${id_formation}`).subscribe(reponse  => 
      {
        this.pdf = reponse;
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

    addVideo()
    {
      const id_formation = +this.route.snapshot.params['id'];
      this.router.navigateByUrl(`admin/ajout_video/${id_formation}`);
    }

    onDeletePdf(id : number)
    {
      this.formation.supprimerPdf(id)
    }
    onDeleteVideo(id : number)
    {
      this.formation.supprimerVideo(id)
    }
}
