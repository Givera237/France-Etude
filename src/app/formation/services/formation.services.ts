import { Component,Injectable, TemplateRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Image } from '../models/image';
import { Formation } from '../models/formation';
import { CookieServices } from 'src/app/cookie.service';
import { NgIfContext } from '@angular/common';



@Injectable({
    providedIn: 'root'
  })
  
  export class FormationService
   {
    formations!: Formation[];
    images!: Image[];
    
    constructor(
        private http : HttpClient,
        ){}   

    listeFormation()
    {
        this.http.get<Formation[]>('http://localhost:3000/api/liste/formation').subscribe(reponse  => 
      {
        this.formations = reponse;
        console.log(this.formations)
      }
      );
    }

    listeImage()
    {
        this.http.get<Image[]>('http://localhost:3000/api/liste/imagecomplet').subscribe(reponse  => 
        {
          this.images = reponse;
        }
        );
    }

    supprimerFormationGratuite( id_formation : number)
    {
        this.http.delete(`http://localhost:3000/api/formation/supprimer/${id_formation}`).subscribe(reponse  => 
      {
        console.log('Réponse : ', reponse),
        (error: any) => console.log('Erreur : ', error)
  
      }
      )
    }
   }