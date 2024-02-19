import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Repertoire } from 'src/app/formation/models/repertoire';
import { Abonnement } from '../../models/abonnement';
import { AdministrateurServices } from '../../services/administrateur-service';

@Component({
  selector: 'app-liste-abonnement',
  templateUrl: './liste-abonnement.component.html',
  styleUrls: ['./liste-abonnement.component.scss']
})
export class ListeAbonnementComponent 
{
  abonnement!: Abonnement[]
  repertoire!: Repertoire[]

  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private admin : AdministrateurServices
    ){}


  ngOnInit() : void
  { 
    const id_repertoire = this.route.snapshot.params['id'];

   

    this.http.get<Abonnement[]>(`http://localhost:3000/api/liste/abonnement/${id_repertoire}`).subscribe(reponse  => 
    {
      this.abonnement = reponse;
      console.log('voici les abonnements : ', this.abonnement )
    }
    );

  }

  desabonner(id : number)
  {    
    this.admin.desabonnement(id)
  }

}
