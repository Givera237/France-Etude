import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { FormGroup } from '@angular/forms';



@Injectable({
    providedIn: 'root'
  })

  export class AdministrateurServices
  {
    constructor(
      private http : HttpClient,
        private router : Router ){} 


    abonnement(obj : FormGroup["value"] )
    {
        this.http.post('http://localhost:3000/api/creation/abonnement', obj, { observe: 'response' }).subscribe
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
        this.http.post(`http://localhost:3000/api/creation/formation`, essai, { observe: 'response' }).subscribe
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
      this.http.post(`http://localhost:3000/api/creation/repertoire`, essai, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            console.log('Post bien envoyé')
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
      this.http.post('http://localhost:3000/api/sendmail/1', obj, { observe: 'response' }).subscribe
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
      this.http.delete(`http://localhost:3000/api/video/supprimer/${id}`).subscribe(reponse  => 
      {
        console.log('Réponse : ', reponse),
        (error: any) => console.log('Erreur : ', error)
        this.router.navigateByUrl(`admin/formation_payante/${id_repertoire}`);
      }
      )
    }

    supprimerPdf(id : number, id_repertoire : number)
    {
      this.http.delete(`http://localhost:3000/api/pdf/supprimer/${id}`).subscribe(reponse  => 
    {
      console.log('Réponse : ', reponse),
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`admin/formation_payante/${id_repertoire}`);
    }
    )
    }

    supprimerRepertoire(id_formation : number)
    {
      this.http.delete(`http://localhost:3000/api/repertoire/supprimer/${id_formation}`).subscribe(reponse  => 
    {
      console.log('Repertoire supprimé : ', reponse),
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`formation/payante`);
    }
    )
    }

    desabonnement(id : number)
    {
      this.http.delete(`http://localhost:3000/api/abonnement/supprimer/${id}`).subscribe(reponse  => 
      {
        console.log('utilisateur désabonné : ', reponse),
        (error: any) => console.log('Erreur : ', error)
        this.router.navigateByUrl(`formation/payante`);
      }
      )
    }

    modifierFormationGratuite(essai : FormData,id_formation : number)
    {
      this.http.put(`http://localhost:3000/api/formation/modifier/${id_formation}`, essai, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          console.log('Post bien envoyé')
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
      this.http.put(`http://localhost:3000/api/repertoire/modifier/${id_repertoire}`, essai, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          console.log('Post bien envoyé')
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
      this.http.post(`http://localhost:3000/api/uploads/pdf/${id_repertoire}`, essai, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            console.log('Post bien envoyé')
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
      this.http.post(`http://localhost:3000/api/uploads/video/${id_repertoire}`,essai, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            console.log('Post bien envoyé')
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
  }
  