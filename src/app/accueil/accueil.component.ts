import { Component, ElementRef, ViewChild } from '@angular/core';
import AOS from 'aos';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Utilisateur } from '../administrateur/models/utilisateurs';
import { AuthentificationService } from '../authentification/service/authentification-service';
import { CookieServices } from '../cookie.service';

@Component({
  selector: 'app-accueil',
  imports: [ReactiveFormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
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
  connexion!: string
  passwordVisible!: boolean


  constructor(
    private formbuilder : FormBuilder,
    private cookieService: CookieServices,
    private authentification :AuthentificationService
   ){}

ngOnInit() : void
{
AOS.init();

this.connexion = this.cookieService.getCookie('connexion');
this.erreur = "";
this.inscriptionForm = this.formbuilder.group
(
{
pseudo: [null,[Validators.required]],
email: [null,[Validators.required]],
password: [null,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!.,?_@#$%^&*])[a-zA-Z0-9!.,?_@#$%^&*]{8,}$/)]],
confirmation_password: [null ,[Validators.required]],
code_confirmation: [4,[Validators.required]],

},
{ validators: this.passwordMatchValidator }
) ;
}

passwordMatchValidator(form: FormGroup) {
return form.get('password')?.value === form.get('confirmation_password')?.value
? null
: { mismatch: true };
}

get usernameControl(): any 
{
return this.inscriptionForm.get('password');
}

togglePasswordVisibility() 
{
this.passwordVisible = !this.passwordVisible;
}

  onSubmit() : void
  { 
  this.inscriptionForm.value.code_confirmation = Math.floor(Math.random() * 100);
  const obj = this.inscriptionForm.value;
  const code = this.inscriptionForm.value.code_confirmation;
  this.authentification.setCode(code)
  const route = "https://franceétudes.com:3000/api/envoie_mail_confirmation"

  this.authentification.verification_email(obj, code, this.erreur )
  //display-4 text-center roboto-bold fw-bold text-white 
  }




  @ViewChild('typewriterText')
  typewriterTextElement!: ElementRef;

  ngAfterViewInit() {
    const element = this.typewriterTextElement.nativeElement;
    element.addEventListener('animationend', (event: AnimationEvent) => {
      if (event.animationName === 'frappe') {
        element.classList.add('termine');
      }
    });
  }






}
