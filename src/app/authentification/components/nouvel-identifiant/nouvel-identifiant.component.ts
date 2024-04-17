import { Component } from '@angular/core';
import { HttpClient,  HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../../service/authentification-service';
import { Utilisateur } from '../../models/utilisateurs';


@Component({
  selector: 'app-nouvel-identifiant',
  templateUrl: './nouvel-identifiant.component.html',
  styleUrls: ['./nouvel-identifiant.component.scss']
})
export class NouvelIdentifiantComponent 
{
  newForm!: FormGroup;
  erreur!:string;
  connexion!: string;
  cookie!: any;
  pseudo!: string;
  maVariable!: Utilisateur
  passwordVisible = false;

  constructor
  (
    private formbuilder : FormBuilder,
    private auth : AuthentificationService  ,
    private http : HttpClient,
    private router : Router, 
   ){}

ngOnInit() :void
{
  this.erreur = '';
  this.maVariable = this.auth.getVariable();
  if(this.maVariable)
    {
      console.log('la variable : ', this.maVariable)
      console.log('la variable : ', this.maVariable.email)
    }

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
    this.http.put(`https://franceétudes.com:3000/api/utilisateur/modifier/${this.maVariable.email}`, obj, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {            
            console.log(response)
            this.router.navigateByUrl(`authentification/connexion`);
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
