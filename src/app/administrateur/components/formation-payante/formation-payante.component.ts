import { Component, ElementRef, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../models/video';
import { CookieServices } from 'src/app/cookie.service';
import { Pdf } from '../../models/pdf';
import { AdministrateurServices } from '../../services/administrateur-service';
import { NgIfContext } from '@angular/common';
import videojs from 'video.js';




@Component({
  selector: 'app-formation-payante',
  templateUrl: './formation-payante.component.html',
  styleUrls: ['./formation-payante.component.scss']
})
export class FormationPayanteComponent implements AfterViewInit
{
  videos!: Video[];
  pdf!: Pdf[];
  admin!: string
  connexion!: string;
  non_connecte!: TemplateRef<NgIfContext<boolean>>|null;
  players: any[] = [];

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  player: any;

  //private player: videojs.Player;


  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private router : Router,
   private admins : AdministrateurServices,
   private cookieService: CookieServices,
   private elementRef: ElementRef
  ){} 


  ngAfterViewInit()
  {
    this.player = videojs(this.elementRef.nativeElement.querySelector('#my-video'), 
    {
      controls: true,
      autoplay: false,
      preload: 'auto',
      // Autres options de configuration si nécessaire
    });
  }


  ngOnDestroy() 
  {
    if (this.player) 
    {
      this.player.dispose();
    }
  }


  ngOnInit() : void
  {
    this.admin = this.cookieService.getCookie('status');
    this.connexion = this.cookieService.getCookie('connexion');
 
    const id_repertoire = this.route.snapshot.params['id'];

    this.http.get<Video[]>(`https://franceétudes.com:3000/api/video_uploads/${id_repertoire}`).subscribe(reponse  => 
    {
      this.videos = reponse;
      //this.initializePlayers();

    }
    );

    this.http.get<Pdf[]>(`https://franceétudes.com:3000/api/liste/Pdf/${id_repertoire}`).subscribe(reponse  => 
    {
      this.pdf = reponse;
    }
    );




/*

    const player = videojs(this.videoPlayer.nativeElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      sources: [{
        src: 'https://franceétudes.com:3000/public/data/uploads/videos/PRESENATION_DES_ETAPES_POUR_ETUDIER_EN_FRANCE.mp4_1728493765780.mp4',
        type: 'video/mp4'
      }],
      // Options pour désactiver le téléchargement
      controlBar: {
        downloadToggle: false // Désactive le bouton de téléchargement
      }
    });
*/

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

    this.admins.supprimerVideoPayante(id, id_repertoire)
  }

  deletePdf(id : number)
  {
    const id_repertoire = this.route.snapshot.params['id'];

    this.admins.supprimerPdf(id, id_repertoire)
    
  }

  deleteRepertoire()
  {
    const id_formation = this.route.snapshot.params['id'];

   this.admins.supprimerRepertoire(id_formation)
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

  onConnect()
    {
      this.router.navigateByUrl(`authentification/connexion`);
    }

}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

