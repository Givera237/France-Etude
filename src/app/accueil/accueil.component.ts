import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as AOS from 'aos';
import { HttpClient,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Utilisateur } from '../authentification/models/utilisateurs';
import { Router } from '@angular/router';


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

 

  constructor(
    private cookieService: CookieService,
    private http : HttpClient, 
   private formbuilder : FormBuilder,
   private router : Router,
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
        }
      ) ;
    }

    imgCollection: Array<object> = [
      {
        image: '/assets/campus-de-luniversite-de-toronto.jpg',
        thumbImage: '/assets/campus-de-luniversite-de-toronto.jpg',
        alt: 'Choix de votre université',
        title: 'Choix de votre université'
      }, {
        image: '/assets/groupe étudiant 1.jpg',
        thumbImage: '/assets/groupe étudiant 1.jpg',
        title: 'Procédure Campus France',
        alt: 'obtenir des acceptations sur Campus France'
      }, {
        image: '/assets/image-figaro-etudiants-etrangers-france-.webp',
        thumbImage: '/assets/image-figaro-etudiants-etrangers-france-.webp',
        title: 'Obtention de logement',
        alt: 'Obtenir un logement en France'
      }, {
        image: '/assets/pexels-atypeek-dgn-5781917.jpg',
        thumbImage: '/assets/pexels-atypeek-dgn-5781917.jpg',
        title: 'Obtention de votre visa ',
        alt: 'Visa pour la France'
      },
  
  ];

  onSubmit() : void
  { 
    const obj = this.inscriptionForm.value;
    this.http.post('http://localhost:3000/api/register', obj, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          this.router.navigateByUrl(`authentification/connexion`);
        }
        else 
        {
          console.log('merde combi');
        }
      },
      error => 
      {
        console.error(error);
        this.erreur = error.error.message;
        console.log(error.error.message);
         // Afficher l'erreur à l'utilisateur
      } 
    ) ;  

  }

}
