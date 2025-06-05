import { Component, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import AOS from 'aos';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Utilisateur } from '../administrateur/models/utilisateurs';
import { AuthentificationService } from '../authentification/service/authentification-service';
import { CookieServices } from '../cookie.service';
import { HttpClient } from '@angular/common/http';
import { AdministrateurServices } from '../administrateur/service/administrateur-service';
import { commentaire } from '../administrateur/models/commentaire';



@Component({
  selector: 'app-accueil',
  imports: [ReactiveFormsModule, FormsModule,],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent 
{
  inscriptionForm!: FormGroup;
  commentaireForm!:  FormGroup;
  utilisateur!: Utilisateur;
  pseudo!: string;
  emailRegex!: RegExp;
  erreur!: string;
  imagePath!: string
  commentaire!: any[]
  com!: any
  coma!: any[]
  isCollapsed = true;
  connexion!: string  
  items!: any[]
  id_utilisateur!: string
  passwordVisible!: boolean


  constructor(
    private formbuilder : FormBuilder,
    private admin : AdministrateurServices,
    private http : HttpClient,
    private cookieService: CookieServices,
    private authentification :AuthentificationService
   ){}

  ngOnInit() : void
  {
    AOS.init();

    this.connexion = this.cookieService.getCookie('connexion');
    this.id_utilisateur = this.cookieService.getCookie('id_utilisateur');
    
    this.items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);


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

    this.commentaireForm = this.formbuilder.group
    (
      {
        valeur: [null,[Validators.required]],
        id_utilisateur: [1,[Validators.required]],
      }
    )

    this.http.get<any>(`https://franceétudes.com:3000/api/liste/commentaire/${this.id_utilisateur}`).subscribe((reponse: any)  => 
      {
        console.log(reponse)
        console.log(reponse.liste)
        this.commentaire = reponse.liste
        this.com = reponse.commentaire_user
        console.log(this.com)
      }
      );

      this.coma =
      [
        {speudo: "isfoucau", valeur: "FranceÉtudes m'a été d'une grande"},
        {speudo: "givera", valeur: "FranceÉtudes m'a été d'une grande aide pour mon voyage en France. Je vous recommande"},
        {speudo: "Farnel", valeur: "FranceÉtudes m'a été d'une grande aide pour mon voyage en France."},
        {speudo: "Junior", valeur: "FranceÉtudes m'a été"},
        {speudo: "Ango", valeur: "grande aide pour mon voyage en France."},

      ]
  }

  passwordMatchValidator(form: FormGroup) 
  {
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
  }

  commenter()
  {
    const obj = this.commentaireForm.value;
    console.log(obj)

    this.admin.commenter(obj)
  }
}


