import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../../service/authentification-service';
import { Utilisateur } from '../../models/utilisateurs';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.component.html',
  styleUrls: ['./verification-email.component.scss']
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
    private route: ActivatedRoute,
    private router: Router,
    private http : HttpClient, 
    private authentification :AuthentificationService
  ) { }
   


  ngOnInit() 
  {
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
  }
}
