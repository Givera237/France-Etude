import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { AdministrateurServices } from '../../service/administrateur-service';

@Component({
  selector: 'app-modifier-repertoire',
  imports: [FormsModule],
  templateUrl: './modifier-repertoire.component.html',
  styleUrl: './modifier-repertoire.component.scss'
})
export class ModifierRepertoireComponent 
{
  essai = new FormData();
  titre!: string
  description!: string
  contenu!: string 
  prix!:string
  admi!: string;


  constructor
  (
   private http : HttpClient, 
   private router : Router,
   private route : ActivatedRoute,
   private admin : AdministrateurServices,
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
    const id_repertoire = +this.route.snapshot.params['id'];

    this.essai.append('titre', this.titre);
    this.essai.append('description', this.description);
    this.essai.append('contenu', this.contenu);
    this.essai.append('prix', this.prix);

    this.admin.modifierFormationPayante(this.essai, id_repertoire)  
  }

  onConnect()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }
}
