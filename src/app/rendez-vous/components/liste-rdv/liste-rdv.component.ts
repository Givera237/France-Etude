import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { RendezVousService } from '../../services/rendez-vous-service';
import { ListeReservation } from '../../models/liste-reservation';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.scss']
})
export class ListeRdvComponent 
{
  liste!: ListeReservation[]

  constructor
  (
    private http : HttpClient,
    private formbuilder : FormBuilder,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}
/*
  ngOnInit()
  {
    this.http.get<ListeReservation[]>('http://localhost:3000/api/liste/rendez_vous_effectif').subscribe(reponse  => 
      {
       this.liste = reponse;
        console.log(this.liste);
      }

    )
  }
*/
rendezVousList: ListeReservation[] = [];


ngOnInit() {
  this.loadRendezVous();
  console.log(this.rendezVousList)

}

loadRendezVous() {
  this.rdv.getRendezVous().subscribe(data => {
    this.rendezVousList = data;
    console.log(data)
    this.sortRendezVous();
  });
}

sortRendezVous() {
  this.rendezVousList.sort((a, b) => a.date_debut.getTime() - b.date_debut.getTime());
}


}

const rendezVousList: ListeReservation[] = [
      {
        id_rendez_vous: 1,
        heure_debut: new Date('2024-08-31T09:00:00'),
        heure_fin: new Date('2024-08-31T10:00:00'),
        date_debut: new Date('2024-08-31T00:00:00'),
        duree: 60,
        type: 'consultation',
        nom: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        telephone: 123456789
      },
      {
        id_rendez_vous: 2,
        heure_debut: new Date('2024-09-01T11:00:00'),
        heure_fin: new Date('2024-09-01T12:00:00'),
        date_debut: new Date('2024-09-01T00:00:00'),
        duree: 60,
        type: 'consultation',
        nom: 'Marie Curie',
        email: 'marie.curie@example.com',
        telephone: 987654321
      },
      {
        id_rendez_vous: 3,
        heure_debut: new Date('2024-08-30T14:00:00'),
        heure_fin: new Date('2024-08-30T15:00:00'),
        date_debut: new Date('2024-08-30T00:00:00'),
        duree: 60,
        type: 'consultation',
        nom: 'Albert Einstein',
        email: 'albert.einstein@example.com',
        telephone: 123123123
      }
    ];
    