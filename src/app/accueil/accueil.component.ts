import { Component, ElementRef } from '@angular/core';
import * as AOS from 'aos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Utilisateur } from '../authentification/models/utilisateurs';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification/service/authentification-service';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent
 {
  inscriptionForm!: FormGroup;
  utilisateur!: Utilisateur;
  pseudo!: string;
  emailRegex!: RegExp;
  erreur!: string;
  imagePath!: string
  isCollapsed = true;
 


  constructor(
              private http : HttpClient, 
              private formbuilder : FormBuilder,
              private router : Router,
              private authentification :AuthentificationService
             ){}

    ngOnInit() : void
    {
      AOS.init();

      this.erreur = "";
      this.inscriptionForm = this.formbuilder.group
      (
        {
          pseudo: [null,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[,.!?]).{6,}$/)]],
          email: [null,[Validators.required]],
          code_confirmation: [4,[Validators.required]],

        }
      ) ;
    }

    get usernameControl(): any 
  {
    return this.inscriptionForm.get('pseudo');
  }

  onSubmit() : void
  { 
    //const obj = this.inscriptionForm.value;

    this.inscriptionForm.value.code_confirmation = Math.floor(Math.random() * 100);
    const obj = this.inscriptionForm.value;
    const code = this.inscriptionForm.value.code_confirmation;
    this.authentification.setCode(code)
    const route = "http://localhost:3000/api/envoie_mail_confirmation"
 
    this.authentification.verification_email(obj, code, this.erreur )
/*
    this.http.post('http://localhost:3000/api/register', obj, { observe: 'response' }).subscribe
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
        this.erreur = error.error.message;
        console.log(error.error.message);
         // Afficher l'erreur à l'utilisateur
      } 
    ) ;  
*/
  }
}
