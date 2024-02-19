import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utilisateur } from 'src/app/authentification/models/utilisateurs';
import { Repertoire } from 'src/app/formation/models/repertoire';
import { AdministrateurServices } from '../../services/administrateur-service';


@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent 
{
  essai = new FormData();
  adresse_visiteur!: string
  utilisateur!: Utilisateur[]
  repertoire!: Repertoire[]
  titre!: string[]
  titre_repertoire!: string

  mailForm!: FormGroup;

  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private formbuilder : FormBuilder,
   private admin : AdministrateurServices,
  ){}

  ngOnInit() : void
  {
    this.mailForm = this.formbuilder.group
      (
        {
          adresse_visiteur: [null],
          titre_repertoire: [null], 
        }
      ) ;

    const id_formation = this.route.snapshot.params['id'];
    this.http.get<string[]>('http://localhost:3000/api/liste/titre_repertoire').subscribe(reponse  => 
      {
        this.titre = reponse;
      }
      );
      this.http.get<Utilisateur[]>('http://localhost:3000/api/liste/adresse_mail').subscribe(reponse  => 
      {
        this.utilisateur = reponse;
      }
      );
  } 
  
  Submit()
  {
    const obj = this.mailForm.value;
    console.log(obj);
    this.admin.abonnement(obj)
  }

 
}
