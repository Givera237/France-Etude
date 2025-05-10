import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { Formation } from '../../models/formation';
import { Video } from '../../models/video';
import { FormationService } from '../../service/formation.services';
import { Pdf } from '../../../administrateur/models/pdf';
import { SafePipe } from "../../../safe.pipe";

@Component({
  selector: 'app-formation-unique',
  imports: [SafePipe],
  templateUrl: './formation-unique.component.html',
  styleUrl: './formation-unique.component.scss'
})
export class FormationUniqueComponent 
{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor(
    private cookieService: CookieServices,
    private formation : FormationService,
    private sanitizer: DomSanitizer ){}

  videos !: Video[];
  formations !: Formation[];
  pdf!: Pdf[];
  url!: any[]
  path !: string;
  admin!: string;
  id = +this.route.snapshot.params['id'];




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

    onViewFormationPayante()
    {
      this.router.navigateByUrl(`formation/payante`);
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
