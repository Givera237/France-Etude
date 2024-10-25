import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { ListeCreneaux } from '../../models/liste-creneaux';
import { RendezVousService } from '../../services/rendez-vous-service';

@Component({
  selector: 'app-creneaux-dispo',
  templateUrl: './creneaux-dispo.component.html',
  styleUrls: ['./creneaux-dispo.component.scss']
})
export class CreneauxDispoComponent 
{
  liste_creneau!: ListeCreneaux[]
  rdvForm !: any 
  email!: string
  originalDate !: any
  timeString: string = '11h45'; // Heure à appliquer
  isoDateGmt0!: string;
  formattedDate!: string;
  isoDate!: string;


  constructor
  (
    private http : HttpClient,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}

   ngOnInit()
   {
    this.rdvForm = this.rdv.getRdv()
    this.liste_creneau = this.rdv.getListeCreneau()
    this.email = this.rdv.getEmail()
    this.originalDate = this.rdv.getDateDebut()
   }

   envoi(heure_debut : string)
   {
    const [hours, minutes] = this.parseTime(heure_debut);
    const date = this.originalDate; // GMT+1200

    // Obtenir l'année, le mois, le jour, l'heure, les minutes, les secondes et les millisecondes
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Calculer le décalage horaire en heures et minutes
    const timezoneOffset = date.getTimezoneOffset(); // en minutes
    const offsetSign = timezoneOffset > 0 ? '-' : '+';
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');

    // Construire la chaîne au format ISO 8601 avec le fuseau horaire
    this.isoDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
    this.rdvForm.date_debut = this.isoDate

     this.http.post(`https://franceétudes.com:3000/api/creation/rendez_vous`, this.rdvForm, { observe: 'response' }).subscribe
     (
       (response: HttpResponse<any>) => 
       {
         if (response.status === 200) 
         {
           this.router.navigateByUrl(`rdv/confirmation-rdv/${this.email}`);
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
 
   parseTime(time: string): [number, number] 
   {
     // Extrait les heures et minutes du format "10h30"
     const [h, m] = time.split(':');
     return [parseInt(h, 10), parseInt(m, 10)];
   }
}
