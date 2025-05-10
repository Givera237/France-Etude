import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../service/authentification-service';

@Component({
  selector: 'app-affiche-erreur',
  imports: [],
  templateUrl: './affiche-erreur.component.html',
  styleUrl: './affiche-erreur.component.scss'
})
export class AfficheErreurComponent 
{
  constructor
  (
   private authentification :AuthentificationService,
   private router : Router,
  ){}

  erreur_mail!: string

  ngOnInit() : void
  {
    this.erreur_mail = this.authentification.getErreur()
    console.log(this.erreur_mail)
  } 

  onRedirect()
  {
    this.router.navigateByUrl('authentification/inscription');

  }
}
