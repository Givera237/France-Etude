import { Component } from '@angular/core';
import { HttpClient,  HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../../service/authentification-service';

@Component({
  selector: 'app-entre-email-perdu',
  templateUrl: './entre-email-perdu.component.html',
  styleUrls: ['./entre-email-perdu.component.scss']
})
export class EntreEmailPerduComponent 
{
  verificationForm!: FormGroup;
  erreur!:string;
  connexion!: string;
  cookie!: any;
  pseudo!: string;
  passwordVisible = false;

  constructor(
              private formbuilder : FormBuilder,
              private auth : AuthentificationService  ,
              private http : HttpClient,
              private router : Router, 
             ){}

  ngOnInit() :void
  {
    this.erreur = '';

    this.verificationForm = this.formbuilder.group
    (
      {
        email: [null],
        code_confirmation: [0,[Validators.required]],
      }
    ) ;
  }

  onSubmit()
  {
    this.verificationForm.value.code_confirmation = Math.floor(Math.random() * 10000);
   const obj = this.verificationForm.value;
   const code = this.verificationForm.value.code_confirmation;
   console.log(code)

    this.http.post('http://localhost:3000/api/code/utilisateur', obj, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {            
            this.auth.setCode(code)
            console.log(response)
            if(response.body != "l'utilisateur n'existe pas ")
              {
                this.auth.setVariable(obj);
                this.router.navigateByUrl(`authentification/code_email`);
              }
              else(response.body === "l'utilisateur n'existe pas ")
              {
                this.erreur = "Votre adresse email n'est pas repertoriée veuillez-vous inscrire"
              }
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
}
