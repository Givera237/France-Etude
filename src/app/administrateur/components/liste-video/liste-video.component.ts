import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-liste-video',
  imports: [],
  templateUrl: './liste-video.component.html',
  styleUrl: './liste-video.component.scss'
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

    this.http.get<Video[]>(`https://franceétudes.com:3000/api/video_uploads/${id_repertoire}`).subscribe(reponse  => 
    {
      this.videos = reponse;
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
    this.http.delete(`https://franceétudes.com:3000/api/video/supprimer/${id}`).subscribe(reponse  => 
    {
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`admin/liste_video`);
    }
    )
  }
}
