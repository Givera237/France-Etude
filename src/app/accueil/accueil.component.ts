import { Component} from '@angular/core';
import * as AOS from 'aos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Utilisateur } from '../authentification/models/utilisateurs';
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
              private formbuilder : FormBuilder,
              private authentification :AuthentificationService
             ){}

    ngOnInit() : void
    {
      AOS.init();

      this.erreur = "";
      this.inscriptionForm = this.formbuilder.group
      (
        {
          pseudo: [null,[Validators.required]],
          email: [null,[Validators.required]],
          password: [null,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!.,?_@#$%^&*])[a-zA-Z0-9!.,?_@#$%^&*]{8,}$/)]],
          code_confirmation: [4,[Validators.required]],

        }
      ) ;
    }

    get usernameControl(): any 
  {
    return this.inscriptionForm.get('password');
  }

  onSubmit() : void
  { 
    this.inscriptionForm.value.code_confirmation = Math.floor(Math.random() * 100);
    const obj = this.inscriptionForm.value;
    const code = this.inscriptionForm.value.code_confirmation;
    this.authentification.setCode(code)
    const route = "https://franceétudes.com:3000/api/envoie_mail_confirmation"
 
    this.authentification.verification_email(obj, code, this.erreur )
  }
}
