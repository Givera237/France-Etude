import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateurs';
import { HttpClient,  HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService
 {
    private variable!: Utilisateur;
    inscriptionForm!: FormGroup;
    code!: number;
    erreur_mail!: string

    constructor(
      private router : Router, 
      private formbuilder : FormBuilder,
      private cookieService: CookieServices,
      private http : HttpClient,
      
){}

ngOnInit() : void
{
  this.inscriptionForm = this.formbuilder.group
  (
    {
      pseudo: [null,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[,.!?]).{6,}$/)]],
      email: [null,[Validators.required]],
      code_confirmation: [4,[Validators.required]],
    }
  ) ;

} 

    setVariable(variable: any) 
    {
      this.variable = variable;
    }
  
    getVariable() 
    {
      return this.variable;
    }
    getErreur()
    {
      return this.erreur_mail
    }

    setCode(code : number)
    {
        this.code = code;
    }

    getCode()
    {
        return this.code
    }

    deconnection(id_utilisateur : number)
    {
      this.http.get<any>(`https://franceétudes.com:3000/api/logout/${id_utilisateur}`).subscribe(reponse  => 
      {
      }
      );
      this.cookieService.setConnexion(30, 'false');
      this.router.navigateByUrl(``);
    }  

    desabonnement(id_utilisateur : number)
    {
      this.http.delete(`https://franceétudes.com:3000/api/utilisateur/supprimer/${id_utilisateur}`).subscribe(reponse  => 
      {
        (error: any) => console.log('Erreur : ', error)
      }
      );
      this.cookieService.delete()
      this.router.navigateByUrl(``);
    } 

    connexion(obj : FormGroup, cookie : any, erreur : string)
    {
      this.http.post('https://franceétudes.com:3000/api/login', obj, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          
          { 
           console.log('session',response.body);
           cookie = response.body;
           
            this.cookieService.setCookie(cookie, 30); 
            this.router.navigateByUrl(`formation/liste`);
          } 
          
        },
        error => 
        {  
          if (error.status === 404) 
          {
            erreur = 'Pseudo inexistant veuillez réessayer!';
            console.log(error);
          }
          if (error.status === 500) 
          {
            erreur = 'Erreur système réessayer plus tard'
          }
          console.error(error.body); // Afficher l'erreur à l'utilisateur
        } 
      ) ;  
    }

    verification_email(obj : Utilisateur, code = this.inscriptionForm.value, erreur : string  )
    {
      const route = "https://franceétudes.com:3000/api/envoie_mail_confirmation"

      this.http.post(route, obj, { observe: 'response' }).subscribe
   (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          this.setVariable(obj);
          this.router.navigate(['authentification/verification']);
        }
        else 
        {
          console.log('merde combi');
        }
      },
      error => 
      {
        console.error(error);
        erreur = error.error.message;
        console.log(error.error.message);
        // Afficher l'erreur à l'utilisateur
      } 
    ) ;
    }

    inscription(maVariable : Utilisateur, erreur : string)
    {
      this.http.post('https://franceétudes.com:3000/api/register', maVariable, { observe: 'response' }).subscribe
      ( 
         (response: HttpResponse<any>) => 
         {
           if (response.status === 200) 
           {
             console.log(response.statusText)
             this.router.navigateByUrl(`authentification/connexion`);
           }
           else 
           {
             console.log('merde combi');
           }
         },
         error => 
         {
           console.error(error);
           this.erreur_mail = error.error.message;
           //console.log(error.error.message);
           this.router.navigateByUrl(`authentification/inscription`);
           // Afficher l'erreur à l'utilisateur
         } 
       ) ;
    }
    
  }