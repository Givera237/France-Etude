import { Component } from '@angular/core';
import { HttpClient,  HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../../service/authentification-service';
import { Utilisateur } from '../../models/utilisateurs';

@Component({
  selector: 'app-code-email',
  templateUrl: './code-email.component.html',
  styleUrls: ['./code-email.component.scss']
})
export class CodeEmailComponent 
{
  essai = new FormData();
  verificationForm!: FormGroup;
  code_verifie!: string
  maVariable!: Utilisateur
  erreur!: string
  email!:string
  lien!: string
  mail!: string
  change!: boolean
  constructor(
    private formbuilder : FormBuilder,
    private auth : AuthentificationService  ,
    private route : ActivatedRoute,
    private http : HttpClient,
    private router : Router, 
   ){}


  
  ngOnInit() 
  {
    
    this.email = this.route.snapshot.params['id'];
    this.erreur = ''
    this.mail = ''
    this.change = false
    this.maVariable = this.auth.getVariable();
    if(this.email)
      {
        this.verificationForm = this.formbuilder.group
        (
          {
            email: [this.email],
            lien: [`https://franceétudes.com/authentification/nouvel_identifiant/${this.email}`] 
          }
        ) ;
      }
  }
  //http://localhost:4200/formation/3 https://franceétudes.com http://localhost:3000 https://franceétudes.com:3000
  onSubmit()
  {
    const obj = this.verificationForm.value;
    this.http.post('https://franceétudes.com:3000/api/code/utilisateur', obj, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {            
          if(response.body != "l'utilisateur n'existe pas ")
            {
              this.auth.setVariable(obj);
              this.change = true
              this.mail = 'Le mail contenant le lien a été envoyé'
            }
          if(response.body === "l'utilisateur n'existe pas ")
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
