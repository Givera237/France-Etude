import { Injectable } from '@angular/core';
import { HttpClient,  HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { ListeCreneaux } from '../models/liste-creneaux';
import { Observable, map } from 'rxjs';
import { ListeReservation } from '../models/liste-reservation';
import { DateIndisponible } from '../models/date-indisponible';

@Injectable({
  providedIn: 'root'
})

export class RendezVousService
 {
    liste_creneau!: ListeCreneaux[]
    rdv!: any
    email!: any
    date_debut = new Date()


    constructor
    (
      private router : Router, 
      private formbuilder : FormBuilder,
      private cookieService: CookieServices,
      private http : HttpClient, 
    ){}

    setEmail(variable: any) 
    {
        this.email = variable;
    }
    getEmail() 
    {
      return this.email;
    }

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

    getRendezVous(): Observable<ListeReservation[]> //https://xn--francetudes-gbb.com:3000/api/liste/rendez_vous_accepter https://franceétudes.com:3000/api/liste/rendez_vous_accepter
    {
      return this.http.get<ListeReservation[]>('https://franceétudes.com:3000/api/liste/rendez_vous_accepter').pipe(
        map((data: any[]) => data.map(item => ({
          ...item,
          date_debut: new Date(item.date_debut) // Assurez-vous que la date est au format Date
        })))
      );
    }

    private apiUrl = 'https://franceétudes:3000/api/liste/jour_indisponible'; // Remplacez par votre URL d'API

    getDateIndisponible(): Observable<DateIndisponible[]> 
    {
      return this.http.get<DateIndisponible[]>(this.apiUrl);
    }
    datesArray !: Date[]
    blockedDate!: DateIndisponible[]
    getJourIndisponible() : Date[]
    {
      this.http.get<DateIndisponible[]>('https://franceétudes:3000/api/liste/jour_indisponible').subscribe(reponse  => 
        {
          this.blockedDate = reponse
           this.datesArray = this.blockedDate.map(item => new Date(item.date));
          console.log('Je tenteb ma chance', this.datesArray);        }
        );

        return this.datesArray
    }

    getBlockedDates(): Observable<DateIndisponible[]> 
    {
      return this.http.get<DateIndisponible[]>(this.apiUrl);
    }

}