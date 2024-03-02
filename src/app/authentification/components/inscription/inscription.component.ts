import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from '../../models/utilisateurs';
import { AuthentificationService } from '../../service/authentification-service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent 
{
  inscriptionForm!: FormGroup;
  monFormulaire!: FormGroup;
  utilisateur!: Utilisateur;
  pseudo!: string;
  emailRegex!: RegExp;
  erreur!: string;

 

  constructor
  (
   private formbuilder : FormBuilder,
   private authentification :AuthentificationService
  ){}

  ngOnInit() : void
  {
    this.erreur = "";

    this.inscriptionForm = this.formbuilder.group
    (
      {
        pseudo: [null,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!.,?_@#$%^&*])[a-zA-Z0-9!.,?_@#$%^&*]{8,}$/)]],
        email: [null,[Validators.required]],
        code_confirmation: [4,[Validators.required]],
      }
    ) ;

  } 

  get usernameControl(): any 
  {
    return this.inscriptionForm.get('pseudo');
  }


  onSubmit() : void
  { 
    
   this.inscriptionForm.value.code_confirmation = Math.floor(Math.random() * 100);
   const obj = this.inscriptionForm.value;
   const code = this.inscriptionForm.value.code_confirmation;
   this.authentification.setCode(code)
   const route = "http://localhost:3000/api/envoie_mail_confirmation"

   this.authentification.verification_email(obj, code, this.erreur )
  }
}
