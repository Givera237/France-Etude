import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { RendezVousService } from '../../services/rendez-vous-service';

@Component({
  selector: 'app-entrer-creneau',
  templateUrl: './entrer-creneau.component.html',
  styleUrls: ['./entrer-creneau.component.scss']
})
export class EntrerCreneauComponent 
{
  creneauForm!: FormGroup
  selectedTime: string = '10h00'; // Heure par défaut
  decision : number = 0
  admi!: string;


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
    this.admi = this.cookieService.getCookie('status');

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
    this.http.put(`https://franceétudes.com:3000/api/credo/modifier/1`, obj, { observe: 'response' }).subscribe
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

    retour()
  {
    this.router.navigateByUrl(`rdv/rdv_form`);
  }

  onConnect()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }
}

