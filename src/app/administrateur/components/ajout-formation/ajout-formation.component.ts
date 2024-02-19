import { Component } from '@angular/core';
import { AdministrateurServices } from '../../services/administrateur-service';

@Component({
  selector: 'app-ajout-formation',
  templateUrl: './ajout-formation.component.html',
  styleUrls: ['./ajout-formation.component.scss']
})
export class AjoutFormationComponent 
{
  essai = new FormData();
  titre!: string
  description!: string
  contenu!: string 
  url!:string

  constructor
  (
   private admin : AdministrateurServices
  ){}


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
    this.essai.append('url', this.url);

    this.admin.ajoutFormationGratuite(this.essai)
  
  }

}


