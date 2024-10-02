import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { RendezVousService } from '../../services/rendez-vous-service';
import { DateIndisponible } from '../../models/date-indisponible';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ajout-jour-indisponible',
  templateUrl: './ajout-jour-indisponible.component.html',
  styleUrls: ['./ajout-jour-indisponible.component.scss'],
  providers: [],
})
export class AjoutJourIndisponibleComponent 
{
  dateIndisponibleForm!: FormGroup
  liste!: DateIndisponible[]
  liste$!: Observable<DateIndisponible[]>
  affichage : boolean = false


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
    this.dateIndisponibleForm = this.formbuilder.group
      (
        {
          date: [null,[Validators.required]] ,
        }
      ) ;
  } 

  onSubmit()
  {
    const obj = this.dateIndisponibleForm.value

    this.http.post(`https://franceétudes.com:3000/api/creation/jour_indisponible`, obj, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          this.liste$ = this.rdv.getDateIndisponible()
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
    this.affichage = true
  }
}
