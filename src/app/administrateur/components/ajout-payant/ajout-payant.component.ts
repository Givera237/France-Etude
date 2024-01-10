import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


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
   private http : HttpClient, 
   private router : Router,
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

    this.essai.append('titre', this.titre);
    this.essai.append('description', this.description);
    this.essai.append('contenu', this.contenu);
    this.essai.append('prix', this.prix);

    console.log(this.essai)
    this.http.post(`http://localhost:3000/api/creation/repertoire`, this.essai, { observe: 'response' }).subscribe
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
