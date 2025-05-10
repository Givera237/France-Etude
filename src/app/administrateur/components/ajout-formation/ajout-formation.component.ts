import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { AdministrateurServices } from '../../service/administrateur-service';

@Component({
  selector: 'app-ajout-formation',
  imports: [FormsModule],
  templateUrl: './ajout-formation.component.html',
  styleUrl: './ajout-formation.component.scss'
})
export class AjoutFormationComponent 
{
  essai = new FormData();
  titre!: string
  description!: string
  contenu!: string 
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

    this.admin.ajoutFormationGratuite(this.essai)
  }

  onConnect()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }
}
