import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../models/video';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieServices } from 'src/app/cookie.service';

@Component({
  selector: 'app-liste-video',
  templateUrl: './liste-video.component.html',
  styleUrls: ['./liste-video.component.scss']
})
export class ListeVideoComponent 
{
  videos!: Video[];
  admin!: string

  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private router : Router,
   private cookieService: CookieServices,
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
  }

  onViewFormation() : void
  {
    if(this.admin === '1')
    {
      const id_formation = this.route.snapshot.params['id'];
      this.router.navigateByUrl(`admin/up_video/${id_formation}`); 
    }
  }

  onDelete(id : number)
  {
    const id_formation = this.route.snapshot.params['id'];
    this.http.delete(`http://localhost:3000/api/video/supprimer/${id}`).subscribe(reponse  => 
    {
      console.log('Réponse : ', reponse),
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`admin/liste_video`);
    }
    )
  }
}
