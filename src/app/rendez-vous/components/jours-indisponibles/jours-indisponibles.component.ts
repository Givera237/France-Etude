import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { ListeCreneaux } from '../../models/liste-creneaux';
import { RendezVousService } from '../../services/rendez-vous-service';
import { ListeReservation } from '../../models/liste-reservation';

@Component({
  selector: 'app-jours-indisponibles',
  templateUrl: './jours-indisponibles.component.html',
  styleUrls: ['./jours-indisponibles.component.scss']
})
export class JoursIndisponiblesComponent 
{
  liste!: Jours[]
  refuse!: string
  admin!: string;


  constructor
  (
    private http : HttpClient,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}

  ngOnInit()
  {
    this.admin = this.cookieService.getCookie('status');

    this.http.get<Jours[]>('http://localhost:3000/api/liste/jour_indisponible').subscribe(reponse  => 
      {
        this.liste = reponse;
        console.log( 'jour indispo',this.liste)
      }
      );
  }

  ajouter()
  {
    this.router.navigateByUrl(`rdv/ajout_jour_indispo`);
  }

  supprimer(id_rdv : number)
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
}

interface Jours
{
  id : number;
  date: Date
}