import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { AdministrateurServices } from '../../service/administrateur-service';

@Component({
  selector: 'app-upload-pdf',
  imports: [FormsModule],
  templateUrl: './upload-pdf.component.html',
  styleUrl: './upload-pdf.component.scss'
})
export class UploadPdfComponent 
{
  essai = new FormData();
  admi!: string;


  constructor
  (
   private route : ActivatedRoute,
   private admin : AdministrateurServices,
   private cookieService: CookieServices,
   private router : Router,

  ){}

  ngOnInit() : void
  {
    this.admi = this.cookieService.getCookie('status');
  }

  onFileChange(event: any) 
  {
    if (event.target.files && event.target.files.length > 0) 
    {
      this.essai.delete('pdf'); // Supprimer l'image précédente s'il y en a une
      this.essai.append('pdf', event.target.files[0]); // Ajouter la nouvelle image
    }
  }

  onSubmit()
  {
    const id_repertoire = this.route.snapshot.params['id'];

    this.admin.uploadPdf(this.essai, id_repertoire)
  }

  onConnect()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }
}
