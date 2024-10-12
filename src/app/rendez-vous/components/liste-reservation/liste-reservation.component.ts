import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { RendezVousService } from '../../services/rendez-vous-service';
import { ListeReservation } from '../../models/liste-reservation';

@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.scss']
})
export class ListeReservationComponent 
{
  liste!: ListeReservation[]
  accepte!: string
  refuse!: string
  annule!: string
  decision = 0

  constructor
  (
    private http : HttpClient,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}

  ngOnInit()
  {
    this.http.get<ListeReservation[]>('https://franceétudes.com:3000/api/liste/rendez_vous_effectif').subscribe(reponse  => 
      {
        this.liste = reponse;
        console.log(reponse)
      }
      );
  }


  accepter(id_rdv : number)
  {
    const decision =
    {
      decision: 'effectif'
     }
    this.http.put(`https://franceétudes.com:3000/api/rendez_vous/modifier/${id_rdv}`, decision, { observe: 'response' }).subscribe
  (
    (response: HttpResponse<any>) => 
    {
      if (response.status === 200) 
      {
        this.decision = 1
      }
      else 
      {
        console.log('merde combi');
      }
    },
    error => 
    {
      console.error(error); // Afficher l'erreur à l'utilisateur
    }
  )
  }

  refuser(id_rdv : number)
  {
    const decision =
    {
      decision: 'refuser'
     }
    this.http.put(`https://franceétudes.com:3000/api/rendez_vous/annuler/${id_rdv}`, decision, { observe: 'response' }).subscribe
  (
    (response: HttpResponse<any>) => 
    {
      if (response.status === 200) 
      {
        this.decision = 2      }
      else 
      {
        console.log('merde combi');
      }
    },
    error => 
    {
      console.error(error); // Afficher l'erreur à l'utilisateur
    }
  )
  }

  annuler(id_rdv : number)
  {
    const decision =
    {
      decision: 'annuler'
     }
    this.http.put(`https://franceétudes.com:3000/api/rendez_vous/annuler/${id_rdv}`, decision, { observe: 'response' }).subscribe
  (
    (response: HttpResponse<any>) => 
    {
      if (response.status === 200) 
      {
        this.decision = 3      }
      else 
      {
        console.log('merde combi');
      }
    },
    error => 
    {
      console.error(error); // Afficher l'erreur à l'utilisateur
    }
  )
  }
  onSubmit()
  {
    this.decision = 0
  }

  
}
