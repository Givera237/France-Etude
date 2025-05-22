import { NgIfContext } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { AuthentificationService } from '../../service/authentification-service';

@Component({
  selector: 'app-connexion',
  imports: [ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent 
{
  loginForm!: FormGroup;
  erreur!:string;
  connexion!: string;
  cookie!: any;
  pseudo!: string;
  passwordVisible = false;
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

    this.loginForm = this.formbuilder.group
    (
      {
        pseudo: [null],
        password: [null]     
      }
    ) ;
  }

  togglePasswordVisibility() 
  {
    this.passwordVisible = !this.passwordVisible;
  }

  existe(variable: string): boolean 
  {
    return variable !== undefined && variable !== null;
  }
  

   onSubmit()
  {
    const obj = this.loginForm.value;
    this.http.post('https://franceétudes.com:3000/api/login', obj, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          { 
            console.log(response);          
            this.cookieService.setCookie(response.body, 30);
            this.cookie = response.body.utilisateur
            this.http.get<any[]>('https://franceétudes.com:3000/api/nombre_utilisateur').subscribe(reponse  => 
              {
              }
              );
            this.navigate()
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

  navigate()
  {
    this.router.navigateByUrl('formation/liste');
  }
}
