import { Component } from '@angular/core';
import { HttpClient,  HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
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
  code_verifie!: string
  maVariable!: Utilisateur
  erreur!: string
  code = this.auth.getCode();

  constructor(
    private formbuilder : FormBuilder,
    private auth : AuthentificationService  ,
    private http : HttpClient,
    private router : Router, 
   ){}


  
  ngOnInit() 
  {
    this.erreur = ''
    this.maVariable = this.auth.getVariable();
    this.code = this.auth.getCode();
    if(this.code)
      {
        console.log('le code : ', this.code)
      }
  }

  onSubmit()
  {

    this.essai.append('code', this.code_verifie);
    if(this.code === +this.code_verifie)
    {
      this.router.navigateByUrl(`authentification/nouvel_identifiant`);
    }
    else
    {
      this.erreur = 'Code de confirmation incorrect, veuillez réessayer!'
    }
   
  }
}
