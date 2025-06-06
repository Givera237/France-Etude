import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieServices } from '../../cookie.service'; 
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateurs'; 



@Injectable({
    providedIn: 'root'
  })

  export class AdministrateurServices
  {
    titre: string[] =   ['hello', 'yo']

    constructor
    (
      private http : HttpClient,
      private router : Router 
    ){} 


    abonnement(obj : FormGroup["value"] )
    {
        this.http.post('https://franceétudes.com:3000/api/creation/abonnement', obj, { observe: 'response' }).subscribe
        (
          (response: HttpResponse<any>) => 
          {
           if (response.status === 200) 
            {
              console.log('Abonnement réussi');
              this.router.navigateByUrl(`formation/payante`);
            }
            
          },
          error => 
          {
            if (error.status === 404) 
            {
              console.log(error);
            }
            if (error.status === 500) 
            {
            }
            console.error(error.body); // Afficher l'erreur à l'utilisateur
          } 
        ) ; 
    }

    ajoutFormationGratuite(essai : FormData)
    {
        this.http.post(`https://franceétudes.com:3000/api/creation/formation`, essai, { observe: 'response' }).subscribe
        (
          (response: HttpResponse<any>) => 
          {
            if (response.status === 200) 
            {
              console.log(response.statusText)
              this.router.navigateByUrl(`formation/liste`);
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

    ajoutFormationPayante(essai : FormData)
    {
      this.http.post(`https://franceétudes.com:3000/api/creation/repertoire`, essai, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            this.router.navigateByUrl(`formation/payante`);
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

    envoieMail(obj : FormGroup["value"])
    {
      this.http.post('https://franceétudes.com:3000/api/sendmail/1', obj, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            this.router.navigateByUrl(``);
          }
          
        },
        error => 
        {
          if (error.status === 404) 
          {
            console.log(error);
          }
          if (error.status === 500) 
          {
          }
          console.error(error.body); // Afficher l'erreur à l'utilisateur
        } 
      ) ;  
    }

    supprimerVideoPayante(id : number, id_repertoire : number)
    {
      this.http.delete(`https://franceétudes.com:3000/api/video/supprimer/${id}`).subscribe(reponse  => 
      {
        (error: any) => console.log('Erreur : ', error)
        this.router.navigateByUrl(`admin/formation_payante/${id_repertoire}`);
      }
      )
    }

    supprimerPdf(id : number, id_repertoire : number)
    {
      this.http.delete(`https://franceétudes.com:3000/api/pdf/supprimer/${id}`).subscribe(reponse  => 
    {
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`admin/formation_payante/${id_repertoire}`);
    }
    )
    }

    supprimerRepertoire(id_formation : number)
    {
      this.http.delete(`https://franceétudes.com:3000/api/repertoire/supprimer/${id_formation}`).subscribe(reponse  => 
    {
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`formation/payante`);
    }
    )
    }

    desabonnement(id : number)
    {
      this.http.delete(`https://franceétudes.com:3000/api/abonnement/supprimer/${id}`).subscribe(reponse  => 
      {
        (error: any) => console.log('Erreur : ', error)
        this.router.navigateByUrl(`formation/payante`);
      }
      )
    }

    modifierFormationGratuite(essai : FormData,id_formation : number)
    {
      this.http.put(`https://franceétudes.com:3000/api/formation/modifier/${id_formation}`, essai, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          this.router.navigateByUrl(`formation/${id_formation}`);
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

    modifierFormationPayante(essai : FormData, id_repertoire : number)
    {
      this.http.put(`https://franceétudes.com:3000/api/repertoire/modifier/${id_repertoire}`, essai, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          this.router.navigateByUrl(`formation/payante`);
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

    uploadPdf(essai : FormData, id_repertoire : number)
    {
      this.http.post(`https://franceétudes.com:3000/api/uploads/pdf/${id_repertoire}`, essai, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            this.router.navigateByUrl(`admin/formation_payante/${id_repertoire}`);
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

    uploadVideo(essai : FormData, id_repertoire : number)
    {
      this.http.post(`https://franceétudes.com:3000/api/uploads/video/${id_repertoire}`,essai, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            this.router.navigateByUrl(`admin/formation_payante/${id_repertoire}`);
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

    ajoutPdfGratuit(essai : FormData, id_formation : number)
    {
      this.http.post(`https://franceétudes.com:3000/api/uploads/pdf_formation/${id_formation}`, essai, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            this.router.navigateByUrl(`formation/${id_formation}`);
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

    ajoutVideoGratuit(essai : FormData, id_formation : number)
    {
      this.http.post(`https://franceétudes.com:3000/api/creation/video_youtube/${id_formation}`, essai, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            this.router.navigateByUrl(`formation/${id_formation}`);
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

    commenter(com : Utilisateur)
    {
        return this.http.post<any>('https://franceétudes.com:3000/api/creation/commentaire', com).subscribe
        (
            (response: HttpResponse<any>) => 
            {
                if (response.status === 200) 
                { 
                  this.router.navigateByUrl(``);
                } 
            },
            error => 
            {  
          
            }
        );
    }


    recherchePseudo(obj : FormGroup["value"])
    {
      this.http.get<string[]>('https://franceétudes.com:3000/api/liste/titre_repertoire').subscribe
      (reponse  => 
        {
          this.titre = reponse;
          console.log( 'blabla', this.titre)    
        }
      );
      return this.titre ;   
    }

    listePseudo(): Observable<string[]>
    {
       return this.http.get<string[]>('https://franceétudes.com:3000/api/liste/adresse_mail')
    }

    private apiUrl = 'https://franceétudes.com:3000/api/liste/adresse_mail'; // Remplacez par votre URL d'API

    getNoms(): Observable<string[]> 
    {
      return this.http.get<string[]>(this.apiUrl);
    }
  }
  