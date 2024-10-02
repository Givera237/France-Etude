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
  rdvForm!: any
  originalDate!: Date
  timeString: string = '11h45'; // Heure à appliquer

  constructor
  (
    private http : HttpClient,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}

   ngOnInit()
   {
    this.liste_creneau = this.rdv.getListeCreneau()
    this.rdvForm = this.rdv.getRdv()
    this.originalDate = this.rdv.getDateDebut()
   }

   envoi(heure_debut : string)
   {
     const [hours, minutes] = this.parseTime(heure_debut);
     this.originalDate.setHours(hours);
     this.originalDate.setMinutes(minutes);
     this.rdvForm.date_debut = this.originalDate
     
     this.http.post(`https://franceétudes.com:3000/api/creation/rendez_vous`, this.rdvForm, { observe: 'response' }).subscribe
     (
       (response: HttpResponse<any>) => 
       {
         if (response.status === 200) 
         {
           this.router.navigateByUrl(`rdv/rdv_form`);
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
