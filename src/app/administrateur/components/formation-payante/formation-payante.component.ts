import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../models/video';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'src/app/cookie.service';
import { Pdf } from '../../models/pdf';

@Component({
  selector: 'app-formation-payante',
  templateUrl: './formation-payante.component.html',
  styleUrls: ['./formation-payante.component.scss']
})
export class FormationPayanteComponent 
{
  videos!: Video[];
  pdf!: Pdf[];
  admin!: string

  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private router : Router,
   private cookieService: CookieService,
  ){}

  ngOnInit() : void
  {
    this.admin = this.cookieService.getCookie('status');
 
    const id_repertoire = this.route.snapshot.params['id'];

    this.http.get<Video[]>(`http://localhost:3000/api/video_uploads/${id_repertoire}`).subscribe(reponse  => 
    {
      this.videos = reponse;
      console.log('les vidéo :', this.videos);
    }
    );

    this.http.get<Pdf[]>(`http://localhost:3000/api/liste/Pdf/${id_repertoire}`).subscribe(reponse  => 
    {
      this.pdf = reponse;
      console.log('les pdfs :', this.pdf);
    }
    );

  }

  onViewFormation() : void
    {
      if(this.admin === '1')
      {
        const id_formation = this.route.snapshot.params['id'];
        this.router.navigateByUrl(`admin/up_video/${id_formation}`); 
      }
     
    }

    
  addPdf() : void
  {
    if(this.admin === '1')
    {
      const id_formation = this.route.snapshot.params['id'];
      this.router.navigateByUrl(`admin/up_pdf/${id_formation}`); 
    }
  }

  onDeleteVideo(id : number)
  {
    const id_repertoire = this.route.snapshot.params['id'];
    this.http.delete(`http://localhost:3000/api/video/supprimer/${id}`).subscribe(reponse  => 
    {
      console.log('Réponse : ', reponse),
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`admin/formation_payante/${id_repertoire}`);
    }
    )
  }

  deletePdf(id : number)
  {
    const id_repertoire = this.route.snapshot.params['id'];
    this.http.delete(`http://localhost:3000/api/pdf/supprimer/${id}`).subscribe(reponse  => 
    {
      console.log('Réponse : ', reponse),
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`admin/formation_payante/${id_repertoire}`);
    }
    )
  }
  deleteRepertoire()
  {
    const id_formation = this.route.snapshot.params['id'];
    this.http.delete(`http://localhost:3000/api/repertoire/supprimer/${id_formation}`).subscribe(reponse  => 
    {
      console.log('Repertoire supprimé : ', reponse),
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`formation/payante`);
    }
    )
  }

  listeAbonne()
  {
    const id_formation = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`admin/liste_abonne/${id_formation}`);
  }

  onModifyRepertoire()
  {
    const id_repertoire = +this.route.snapshot.params['id'];
    this.router.navigateByUrl(`admin/modifier_repertoire/${id_repertoire}`);
  }

}
