import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Repertoire } from 'src/app/formation/models/repertoire';
import { Abonnement } from '../../models/abonnement';
import { AdministrateurServices } from '../../services/administrateur-service';
import { CookieServices } from 'src/app/cookie.service';

@Component({
  selector: 'app-liste-abonnement',
  templateUrl: './liste-abonnement.component.html',
  styleUrls: ['./liste-abonnement.component.scss']
})
export class ListeAbonnementComponent 
{
  abonnement!: Abonnement[]
  repertoire!: Repertoire[]
  admi!: string;


  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private admin : AdministrateurServices,
   private router : Router,
   private cookieService: CookieServices,
  ){}


  ngOnInit() : void
  { 
    const id_repertoire = this.route.snapshot.params['id'];
    this.admi = this.cookieService.getCookie('status');
   
    this.http.get<Abonnement[]>(`https://franceétudes.com:3000/api/liste/abonnement/${id_repertoire}`).subscribe(reponse  => 
    {
      this.abonnement = reponse;
    }
    );
  }

  desabonner(id : number)
  {    
    this.admin.desabonnement(id)
  }

  onConnect()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }

}
