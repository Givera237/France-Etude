import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Repertoire } from 'src/app/formation/models/repertoire';
import { Abonnement } from '../../models/abonnement';

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
   private router : Router,
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
    const id_formation = this.route.snapshot.params['id'];
    this.http.delete(`http://localhost:3000/api/abonnement/supprimer/${id}`).subscribe(reponse  => 
    {
      console.log('utilisateur désabonné : ', reponse),
      (error: any) => console.log('Erreur : ', error)
      this.router.navigateByUrl(`formation/payante`);
    }
    )
  }

}
