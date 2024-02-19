import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministrateurServices } from '../../services/administrateur-service';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.scss']
})
export class UploadPdfComponent 
{
  essai = new FormData();

  constructor
  (
   private route : ActivatedRoute,
   private admin : AdministrateurServices
  ){}


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
    console.log(this.essai)
    const id_repertoire = this.route.snapshot.params['id'];

    this.admin.uploadPdf(this.essai, id_repertoire)
  }

}
