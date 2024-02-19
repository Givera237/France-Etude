import { Component } from '@angular/core';
import { AdministrateurServices } from '../../services/administrateur-service';


@Component({
  selector: 'app-ajout-payant',
  templateUrl: './ajout-payant.component.html',
  styleUrls: ['./ajout-payant.component.scss']
})
export class AjoutPayantComponent 
{
  essai = new FormData();
  titre!: string
  description!: string
  contenu!: string 
  prix!:string

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
    this.essai.append('prix', this.prix);

    this.admin.ajoutFormationPayante(this.essai)
  }

}
