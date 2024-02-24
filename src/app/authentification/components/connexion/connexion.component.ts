import { Component, TemplateRef } from '@angular/core';
import { HttpClient,  HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieServices } from 'src/app/cookie.service';
import { NgIfContext } from '@angular/common';
import { AuthentificationService } from '../../service/authentification-service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})

export class ConnexionComponent 
{
  loginForm!: FormGroup;
  erreur!:string;
  connexion!: string;
  cookie!: any;
  pseudo!: string;
  existe_pas!: TemplateRef<NgIfContext<boolean>>|null;
  non_connecte!: TemplateRef<NgIfContext<boolean>>|null;

  constructor(
              private formbuilder : FormBuilder,
              private cookieService: CookieServices,
              private auth : AuthentificationService  ,
              private http : HttpClient,
              private router : Router, 
             ){}

  ngOnInit() :void
  {
    this.erreur = '';
    this.connexion = this.cookieService.getCookie('connexion');
    this.pseudo = this.cookieService.getCookie('pseudo');
   // this.cookieService.setCookie(this.cookie, 30)

    this.loginForm = this.formbuilder.group
    (
      {
        pseudo: [null],     
      }
    ) ;
  }

  existe(variable: string): boolean 
  {
    return variable !== undefined && variable !== null;
  }
  

  onSubmit()
  {
    const obj = this.loginForm.value;
   // this.auth.connexion(obj, this.cookie, this.erreur)
    this.http.post('http://localhost:3000/api/login', obj, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {            
            this.cookie = response.body
            this.cookieService.setCookie(this.cookie, 30)
            this.router.navigateByUrl(``);
          } 
        },
        error => 
        {  
          if (error.status === 404) 
          {
            this.erreur = error.error.message;
          }
          if (error.status === 500) 
          {
            this.erreur = error.error.message;
          }
        } 
      ) ;  
  }

  Deconnexion()
  {
    const id_utilisateur = +this.cookieService.getCookie('id_utilisateur');
    this.auth.deconnection(id_utilisateur)
  }

  suppresion()
  {
    const id_utilisateur = +this.cookieService.getCookie('id_utilisateur');
    this.auth.desabonnement(id_utilisateur)
  }
 

}
