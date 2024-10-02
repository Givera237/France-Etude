import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { RendezVousService } from '../../services/rendez-vous-service';

@Component({
  selector: 'app-creer-creneau-initial',
  templateUrl: './creer-creneau-initial.component.html',
  styleUrls: ['./creer-creneau-initial.component.scss']
})
export class CreerCreneauInitialComponent 
{
  creneauForm!: FormGroup
  selectedTime: string = '10h00'; // Heure par défaut


  constructor
  (
    private http : HttpClient,
    private formbuilder : FormBuilder,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}

  ngOnInit()
  {
    this.creneauForm = this.formbuilder.group
      (
        {
          heure_debut: [null,[Validators.required]] ,
          heure_fin: [null,[Validators.required]] 
        }
      ) ;
  }

  onTimeChange(event: Event): void 
  {
    const input = event.target as HTMLInputElement; // Typage correct
    this.selectedTime = input.value; // Récupérer la valeur
  }

  openTimePicker() 
  {
    // Logique pour ouvrir un sélecteur d'heure (si nécessaire)
    console.log('Heure picker ouvert');
  }

  onSubmit()
  {
    const obj = this.creneauForm.value;
    this.http.post(`https://franceétudes.com:3000/api/creation/credo`, obj, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          this.router.navigateByUrl(`rdv/creneau`);
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
