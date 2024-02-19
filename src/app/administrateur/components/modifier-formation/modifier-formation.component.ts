import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateurServices } from '../../services/administrateur-service';

@Component({
  selector: 'app-modifier-formation',
  templateUrl: './modifier-formation.component.html',
  styleUrls: ['./modifier-formation.component.scss']
})
export class ModifierFormationComponent 
{
  essai = new FormData();
  titre!: string
  description!: string
  contenu!: string 
  url!:string

  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private router : Router,
   private admin : AdministrateurServices
  ){}

  ngOnInit() : void
  {
 
    const id_formation = this.route.snapshot.params['id'];
    this.essai.append('image', 'null');
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
    const id_formation = +this.route.snapshot.params['id'];

    this.essai.append('titre', this.titre);
    this.essai.append('description', this.description);
    this.essai.append('contenu', this.contenu);
    this.essai.append('url', this.url);

    this.admin.modifierFormationGratuite(this.essai, id_formation)
    
  }
}
