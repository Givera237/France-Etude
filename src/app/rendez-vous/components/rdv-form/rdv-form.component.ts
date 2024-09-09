import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { ListeCreneaux } from '../../models/liste-creneaux';
import { RendezVousService } from '../../services/rendez-vous-service';
import {NgFor, NgIf} from '@angular/common';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-rdv-form',
  templateUrl: './rdv-form.component.html',
  styleUrls: ['./rdv-form.component.scss']
})
export class RdvFormComponent 
{
  selected!: Date | null ;
  isClicked: boolean = false;
  azerty!: any
  creneau!: any
  liste_creneau!: ListeCreneaux[]
  rdvForm !: FormGroup;
  selectedButtonId: number = 0; // Par défaut, le premier bouton est sélectionné
  blockedDates: Date[] = 
  [
    new Date('2024-08-06'),
    new Date('2024-09-16'), // Exemple de date à bloquer
    new Date('2024-08-15')
  ];


  constructor
  (
    private http : HttpClient,
    private formbuilder : FormBuilder,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}


   foods: Food[] = 
   [
    {value: 'Visa', viewValue: 'Visa'},
    {value: 'Campus France', viewValue: 'Campus France'},
    {value: 'Financement', viewValue: 'Financement'},
   ];


  ngOnInit()
  {
        this.http.get<any[]>('http://localhost:3000/api/liste/rendez_vous_effectif').subscribe(reponse  => 
      {
        this.azerty = reponse;
        console.log(this.azerty)
      }
      );

      this.rdvForm = this.formbuilder.group
      (
        {
          date_debut: [null],
          duree: [null] ,
          type: [null,[Validators.required]] ,
          nom: [null,[Validators.required]] ,
          email: [null,[Validators.required]] ,
          telephone: [null,[Validators.required]] ,

        }
      ) ;
      this.rdvForm.value.date_debut = this.selected
      this.rdvForm.value.duree = this.creneau
  }

  rendezVousTypes = 
  [
    { type: 'visa', tarif: 50, duree: [{'30min' : 30},{'1 heure' : 60},{'1h30min' : 90}, ]  },
    { type: 'financement', tarif: 100 },
    { type: 'entretien', tarif: 75 }
  ];

  selectedType: string = '';
  selectedTarif: number | null = null;

  // Méthode pour mettre à jour le tarif en fonction du type sélectionné
  onTypeChange(event: Event) 
  {
    const selectElement = event.target as HTMLSelectElement;
    const selected = this.rendezVousTypes.find(rdv => rdv.type === selectElement.value);
    this.selectedTarif = selected ? selected.tarif : null;
  }

dateFilter = (date: Date): boolean => 
  {
    // Bloquer les dimanches
    const isSunday = date.getDay() === 0; // 0 = Dimanche

    // Vérifier si la date est dans la liste des dates bloquées
    const isBlockedDate = this.blockedDates.some(blockedDate => 
      blockedDate.getFullYear() === date.getFullYear() &&
      blockedDate.getMonth() === date.getMonth() &&
      blockedDate.getDate() === date.getDate()
    );

    // Retourne false si c'est un dimanche ou une date bloquée
    return !isSunday && !isBlockedDate;
  }
  onButtonClick(buttonId: number, valeur : number ) 
  {
    this.selectedButtonId = buttonId;
    this.creneau = valeur
  }

  creneauDispo()
  {
    const rdv = 
    {
      jour : this.selected ,
      duree : this.creneau
    }
    this.rdvForm.value.date_debut = this.selected
    this.rdvForm.value.duree = this.creneau

    this.http.post(`http://localhost:3000/api/liste/credo`, rdv, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response)
          this.liste_creneau = response.body
          this.rdv.setListeCreneau(this.liste_creneau)
          this.rdv.setRdv(this.rdvForm.value)
          this.rdv.setDateDebut(this.selected)
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

  listeReservation()
  {
    this.router.navigateByUrl(`rdv/liste`);
  }
  entrerCreneau()
  {
    this.router.navigateByUrl(`rdv/entrer_creneau`);
  }
  mesRdv()
  {
    this.router.navigateByUrl(`rdv/mes_rdv`);
  }

  myFilter = (d: Date | null): boolean => 
  {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

}
