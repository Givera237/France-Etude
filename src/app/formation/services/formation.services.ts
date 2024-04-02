import {Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Image } from '../models/image';
import { Formation } from '../models/formation';
import { Objet } from '../models/objet';



@Injectable({
    providedIn: 'root'
  })
  
  export class FormationService
   {
    formations!: Formation[];
    images!: Image[];
    objet!: Objet
    
    constructor(
        private http : HttpClient,
        ){}   

    listeFormation()
    {
        this.http.get<Formation[]>('https://franceétudes.com:3000/api/liste/formation').subscribe(reponse  => 
      {
        this.formations = reponse;
      }
      );
    }

    listeImage()
    {
        this.http.get<Image[]>('https://franceétudes.com:3000/api/liste/imagecomplet').subscribe(reponse  => 
        {
          this.images = reponse;
        }
        );
    }

    supprimerFormationGratuite( id_formation : number)
    {
        this.http.delete(`https://franceétudes.com:3000/api/formation/supprimer/${id_formation}`).subscribe(reponse  => 
      {
        (error: any) => console.log('Erreur : ', error)
  
      }
      )
    }

    supprimerPdf(id : number)
    {
      this.http.delete(`https://franceétudes.com:3000/api/pdf_formation/supprimer/${id}`).subscribe(reponse  => 
      {
        (error: any) => console.log('Erreur : ', error)
      }
      ) 
    }

    supprimerVideo(id : number)
    {
      this.http.delete(`https://franceétudes.com:3000/api/video_youtube/supprimer/${id}`).subscribe(reponse  => 
      {
        (error: any) => console.log('Erreur : ', error)
      }
      ) 
    }

    envoieMessge(objet :Objet)
    {

      this.http.post(`https://franceétudes.com:3000/api/mail_demande_abonnement`, objet, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            //this.router.navigateByUrl(`formation`);
          }
          else 
          {
            console.log('merde combi');
          }
        },
        error => 
        {
          console.error(error); // Afficher l'erreur à l'utilisateur
        }
      )     
    }

   }