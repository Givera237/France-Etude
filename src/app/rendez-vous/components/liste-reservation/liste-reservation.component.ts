import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { ListeCreneaux } from '../../models/liste-creneaux';
import { RendezVousService } from '../../services/rendez-vous-service';
import { ListeReservation } from '../../models/liste-reservation';

@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.scss']
})
export class ListeReservationComponent 
{
  creneau: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers', 'Sneakers',];
  liste!: ListeReservation[]
  accepte!: string
  refuse!: string
  annule!: string

  constructor
  (
    private http : HttpClient,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}

  ngOnInit()
  {
    this.http.get<ListeReservation[]>('http://localhost:3000/api/liste/rendez_vous').subscribe(reponse  => 
      {
        this.liste = reponse;
        console.log(this.liste)
      }
      );
  }


  accepter(id_rdv : number)
  {
    const decision =
    {
      decision: 'effectif'
     }
    this.http.put(`http://localhost:3000/api/rendez_vous/modifier/${id_rdv}`, decision, { observe: 'response' }).subscribe
  (
    (response: HttpResponse<any>) => 
    {
      if (response.status === 200) 
      {
        console.log(response)
        //this.router.navigateByUrl(`formation/${id_formation}`);
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
    this.http.put(`http://localhost:3000/api/rendez_vous/annuler/${id_rdv}`, decision, { observe: 'response' }).subscribe
  (
    (response: HttpResponse<any>) => 
    {
      if (response.status === 200) 
      {
        console.log(response)
        //this.router.navigateByUrl(`formation/${id_formation}`);
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

  annuler(id_rdv : number)
  {
    const decision =
    {
      decision: 'annuler'
     }
    this.http.put(`http://localhost:3000/api/rendez_vous/annuler/${id_rdv}`, decision, { observe: 'response' }).subscribe
  (
    (response: HttpResponse<any>) => 
    {
      if (response.status === 200) 
      {
        console.log(response)
        //this.router.navigateByUrl(`formation/${id_formation}`);
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

  
}