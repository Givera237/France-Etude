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
    console.log(obj)
    this.http.put(`http://localhost:3000/api/credo/modifier/1`, obj, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response)
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
