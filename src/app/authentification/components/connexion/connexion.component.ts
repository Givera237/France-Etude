import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent 
{
  loginForm!: FormGroup;
  erreur!:string;
  constructor(
              private router : Router, 
              private formbuilder : FormBuilder,
              private http : HttpClient
  ){}

  ngOnInit() :void
  {
    this.erreur = '';
    this.loginForm = this.formbuilder.group
    (
      {
        pseudo: [null],     
      }
    ) ;
  }

  onSubmit()
  {
    const obj = this.loginForm.value;
    console.log(obj);
    this.http.post('http://localhost:3000/api/login', obj, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
       /* if (response.status === 200) 
        {
          console.log('avant connexion',environment.connexion);
          console.log(response.body.id_utilisateur);
          console.log(response.status);
          environment.connexion = 1;
          console.log('après connexion',environment.connexion);
          //environment.id_utilisateur = response.body.id_utilisateur;
          this.router.navigateByUrl(``);
        } */
        
      },
      error => 
      {
        
        if (error.status === 404) 
        {
          this.erreur = 'Pseudo inexixtant Veuillez réessayer!!';
          console.log(error);
        //  console.log(error.statusText)
          //this.router.navigateByUrl(`authentification/login`);
        }
        if (error.status === 500) 
        {
          this.erreur = 'Erreur système réessayer plus tard'
        //  console.log(error.statusText)
          //this.router.navigateByUrl(`authentification/login`);
        }
        console.error(error.body); // Afficher l'erreur à l'utilisateur
      } 
    ) ;  

  }

}
