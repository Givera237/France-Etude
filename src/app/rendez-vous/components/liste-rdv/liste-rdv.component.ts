import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { RendezVousService } from '../../services/rendez-vous-service';
import { ListeReservation } from '../../models/liste-reservation';


@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.scss']
})
export class ListeRdvComponent 
{
  liste!: ListeReservation[]

  constructor
  (
    private http : HttpClient,
    private formbuilder : FormBuilder,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}

rendezVousList: ListeReservation[] = [];


ngOnInit() 
{
  this.loadRendezVous();

}

loadRendezVous() 
{
  this.rdv.getRendezVous().subscribe
  (data => 
  {
    this.rendezVousList = data;
    this.sortRendezVous();
  }
);
}

sortRendezVous()
{
  this.rendezVousList.sort((a, b) => a.date_debut.getTime() - b.date_debut.getTime());
}


}

    