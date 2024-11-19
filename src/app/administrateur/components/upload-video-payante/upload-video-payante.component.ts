import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateurServices } from '../../services/administrateur-service';
import { CookieServices } from 'src/app/cookie.service';

@Component({
  selector: 'app-upload-video-payante',
  templateUrl: './upload-video-payante.component.html',
  styleUrls: ['./upload-video-payante.component.scss']
})
export class UploadVideoPayanteComponent
{
  essai = new FormData();
  admi!: string;


  constructor
  (
   private route : ActivatedRoute,
   private admin : AdministrateurServices,
   private router : Router,
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
      this.essai.delete('video'); // Supprimer l'image précédente s'il y en a une
      this.essai.append('video', event.target.files[0]); // Ajouter la nouvelle image
    }
  }

  onSubmit()
  {
    const id_repertoire = this.route.snapshot.params['id'];

    this.admin.uploadVideo(this.essai, id_repertoire)
  }

  onConnect()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }
}
