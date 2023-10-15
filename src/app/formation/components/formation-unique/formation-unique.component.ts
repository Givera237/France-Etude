import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '../../models/video';
@Component({
  selector: 'app-formation-unique',
  templateUrl: './formation-unique.component.html',
  styleUrls: ['./formation-unique.component.scss']
})
export class FormationUniqueComponent 
{
  videos !: Video[];
  path !: string;

  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private router : Router,
    private sanitizer: DomSanitizer ){}

    ngOnInit()
    {
      const id_formation = +this.route.snapshot.params['id'];

      this.http.get<Video[]>(`http://localhost:3000/api/video/${id_formation}`).subscribe(reponse  => 
      {
        this.videos = reponse;
        console.log('Yo bro voici tes objets', reponse);
        this.path = this.videos[0].path;
      }
      )
    }

    getSanitizedURL(path : string) {
      return this.sanitizer.bypassSecurityTrustUrl(path);
    }
}
