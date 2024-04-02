import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-ajout-video-gratuite',
  templateUrl: './ajout-video-gratuite.component.html',
  styleUrls: ['./ajout-video-gratuite.component.scss']
})
export class AjoutVideoGratuiteComponent 
{
  essai = new FormData();
  path!: string
  description!: string
  monFormulaire!: FormGroup;

  constructor
  (
   private route : ActivatedRoute,
   private formbuilder : FormBuilder,
   private http : HttpClient,
   private router : Router
  ){}

  ngOnInit() : void
  {

    this.monFormulaire = this.formbuilder.group
    (
      {
        url: [null,[Validators.required]],
        description: [null,[Validators.required]],
      }
    ) ;
  } 

  Submit() : void
  { 
   const obj = this.monFormulaire.value;
   const id_formation = this.route.snapshot.params['id'];

   this.http.post(`https://franceétudes.com:3000/api/creation/video_youtube/${id_formation}`, obj, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log(response.statusText)
            this.router.navigateByUrl(`formation/${id_formation}`);
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
