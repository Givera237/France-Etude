import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
  ){}

  ngOnInit() : void
  {
 
    const id_formation = this.route.snapshot.params['id'];
    this.essai.append('image', 'undefined');
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

    console.log(this.essai)
    this.http.put(`http://localhost:3000/api/formation/modifier/${id_formation}`, this.essai, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          console.log('Post bien envoyé')
        }
        else 
        {
          console.log('merde combi');
        }
      },
      error => 
      {
        console.error(error); // Afficher l'erreur à l'utilisateur
      }
    )

  }
}
