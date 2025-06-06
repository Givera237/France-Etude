import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../../../administrateur/models/utilisateurs';
import { AuthentificationService } from '../../service/authentification-service';

@Component({
  selector: 'app-nouvel-identifiant',
  imports: [ReactiveFormsModule],
  templateUrl: './nouvel-identifiant.component.html',
  styleUrl: './nouvel-identifiant.component.scss'
})
export class NouvelIdentifiantComponent 
{
  newForm!: FormGroup;
  erreur!:string;
  connexion!: string;
  cookie!: any;
  pseudo!: string;
  email!:string
  maVariable!: Utilisateur
  passwordVisible = false;

  constructor
  (
    private formbuilder : FormBuilder,
    private auth : AuthentificationService  ,
    private route : ActivatedRoute,
    private http : HttpClient,
    private router : Router, 
   ){}

ngOnInit() :void
{
  this.erreur = '';
  this.email = this.route.snapshot.params['id'];

  this.newForm = this.formbuilder.group
  (
    {
      pseudo: [null],
      password: [null,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!.,?_@#$%^&*])[a-zA-Z0-9!.,?_@#$%^&*]{8,}$/)]],     
    }
  ) ;
}
get usernameControl(): any 
{
  return this.newForm.get('password');
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
  const obj = this.newForm.value;
  console.log(obj)
    this.http.put(`https://franceétudes.com:3000/api/utilisateur/modifier/${this.email}`, obj, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {            
            this.router.navigateByUrl(`authentification/confirmation`);
          } 
        },
        error => 
        {  
          if (error.status === 404) 
          {
            console.log(error)
            this.erreur = error.error.message;
          }
          if (error.status === 500) 
          {
            console.log(error)
            this.erreur = error.error.message;
          }
        } 
      ) ;  
}

}
