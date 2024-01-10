import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upload-video-payante',
  templateUrl: './upload-video-payante.component.html',
  styleUrls: ['./upload-video-payante.component.scss']
})
export class UploadVideoPayanteComponent
{
  essai = new FormData();

  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private router : Router,
  ){}

  
  ngOnInit() : void
  {
    const id_repertoire = this.route.snapshot.params['id'];
  }

  onFileChange(event: any) 
  {
    if (event.target.files && event.target.files.length > 0) 
    {
      this.essai.delete('video'); // Supprimer l'image précédente s'il y en a une
      this.essai.append('video', event.target.files[0]); // Ajouter la nouvelle image
    }
  }

  onSubmit()
  {
    console.log(this.essai)
    const id_repertoire = this.route.snapshot.params['id'];
    this.http.post(`http://localhost:3000/api/uploads/video/${id_repertoire}`, this.essai, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          console.log('Post bien envoyé')
          this.router.navigateByUrl(`admin/formation_payante/${id_repertoire}`);
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
