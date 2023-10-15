import { Component } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/utilisateurs';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent 
{
  inscriptionForm!: FormGroup;
  utilisateur!: Utilisateur;
  pseudo!: string;
  emailRegex!: RegExp;
  erreur!: string;

  constructor
  (
   private http : HttpClient, 
   private formbuilder : FormBuilder,
   private router : Router,
  ){}

  ngOnInit() : void
  {
    this.erreur = "";
    this.inscriptionForm = this.formbuilder.group
    (
      {
        pseudo: [null,[Validators.required]],
        email: [null,[Validators.required]],
      }
    ) ;
  } 

  onSubmit() : void
  { 
    const obj = this.inscriptionForm.value;
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

  }
}
