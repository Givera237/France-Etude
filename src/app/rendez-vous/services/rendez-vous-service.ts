import { Injectable } from '@angular/core';
import { HttpClient,  HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { ListeCreneaux } from '../models/liste-creneaux';
import { Observable, map } from 'rxjs';
import { ListeReservation } from '../models/liste-reservation';

@Injectable({
  providedIn: 'root'
})

export class RendezVousService
 {
    liste_creneau!: ListeCreneaux[]
    rdv!: any
    date_debut!: any


    constructor
    (
      private router : Router, 
      private formbuilder : FormBuilder,
      private cookieService: CookieServices,
      private http : HttpClient, 
    ){}

    setListeCreneau(variable: ListeCreneaux[] ) 
    {
        this.liste_creneau = variable;
    }
  
    getListeCreneau() 
    {
      return this.liste_creneau;
    }
    setRdv(rdv : any)
    {
      this.rdv = rdv
    }

    getRdv()
    {
      return this.rdv
    }
    setDateDebut(date_debut : any)
    {
      this.date_debut = date_debut
    }

    getDateDebut()
    {
      return this.date_debut
    }

    getRendezVous(): Observable<ListeReservation[]> 
    {
      return this.http.get<ListeReservation[]>('http://localhost:3000/api/liste/rendez_vous_effectif').pipe(
        map((data: any[]) => data.map(item => ({
          ...item,
          date_debut: new Date(item.date_debut) // Assurez-vous que la date est au format Date
        })))
      );
    }

}