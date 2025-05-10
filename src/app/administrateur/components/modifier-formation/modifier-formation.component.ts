import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { AdministrateurServices } from '../../service/administrateur-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-formation',
  imports: [FormsModule],
  templateUrl: './modifier-formation.component.html',
  styleUrl: './modifier-formation.component.scss'
})
export class ModifierFormationComponent 
{
  essai = new FormData();
  titre!: string
  description!: string
  contenu!: string 
  url!:string
  admi!: string;


  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private router : Router,
   private admin : AdministrateurServices,
   private cookieService: CookieServices,
  ){}

  ngOnInit() : void
  {
    this.admi = this.cookieService.getCookie('status');

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
    
    this.admin.modifierFormationGratuite(this.essai, id_formation)
  }

  onConnect()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }
}
