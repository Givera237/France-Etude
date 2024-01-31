import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier-repertoire',
  templateUrl: './modifier-repertoire.component.html',
  styleUrls: ['./modifier-repertoire.component.scss']
})
export class ModifierRepertoireComponent 
{
  essai = new FormData();
  titre!: string
  description!: string
  contenu!: string 
  prix!:string

  constructor
  (
   private http : HttpClient, 
   private router : Router,
   private route : ActivatedRoute,
  ){}

  ngOnInit() : void
  {
 

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

    console.log(this.essai)
    this.http.put(`http://localhost:3000/api/repertoire/modifier/${id_repertoire}`, this.essai, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          console.log('Post bien envoyé')
          this.router.navigateByUrl(`formation/payante`);
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
