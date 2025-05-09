import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { AdministrateurServices } from '../../service/administrateur-service';

@Component({
  selector: 'app-ajout-payant',
  imports: [FormsModule],
  templateUrl: './ajout-payant.component.html',
  styleUrl: './ajout-payant.component.scss'
})
export class AjoutPayantComponent 
{
  essai = new FormData();
  titre!: string
  description!: string
  contenu!: string 
  prix!:string
  prix_barre!: string
  admi!: string;


  constructor
  (
   private admin : AdministrateurServices,
   private router : Router,
   private cookieService: CookieServices,

  ){}

  ngOnInit() : void
  {
    this.admi = this.cookieService.getCookie('status');
  }

  onFileChange(event: any) 
  {
    if (event.target.files && event.target.files.length > 0) 
    {
      this.essai.delete('image'); // Supprimer l'image précédente s'il y en a une
      this.essai.append('image', event.target.files[0]); // Ajouter la nouvelle image
    }
  }
  

  onSubmit()
  {

    this.essai.append('titre', this.titre);
    this.essai.append('description', this.description);
    this.essai.append('contenu', this.contenu);
    this.essai.append('prix', this.prix);
    this.essai.append('prix_barre', this.prix_barre);

    this.admin.ajoutFormationPayante(this.essai)
  }

  onConnect()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }
}
