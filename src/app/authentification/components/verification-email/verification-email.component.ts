import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../../../administrateur/models/utilisateurs';
import { AuthentificationService } from '../../service/authentification-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verification-email',
  imports: [FormsModule],
  templateUrl: './verification-email.component.html',
  styleUrl: './verification-email.component.scss'
})
export class VerificationEmailComponent 
{
  essai = new FormData();
  code_verifie!: string
  maVariable!: Utilisateur
  code!: number
  erreur!: string

  constructor
  (
    private router : Router,
    private authentification :AuthentificationService
  ) { }

  ngOnInit() 
  {
    this.erreur = ''
    this.maVariable = this.authentification.getVariable();
    this.code = this.authentification.getCode();
  }

  onSubmit()
  {

    this.essai.append('code', this.code_verifie);
    if(this.code === +this.code_verifie)
    {
      this.authentification.inscription(this.maVariable, this.erreur)
    }
    else
    {
      this.erreur = 'Code de confirmation incorrect, veuillez réessayer!'
    }
   
  }
}
