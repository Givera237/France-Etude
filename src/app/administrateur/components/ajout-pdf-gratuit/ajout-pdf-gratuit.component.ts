import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateurServices } from '../../services/administrateur-service';
import { CookieServices } from 'src/app/cookie.service';

@Component({
  selector: 'app-ajout-pdf-gratuit',
  templateUrl: './ajout-pdf-gratuit.component.html',
  styleUrls: ['./ajout-pdf-gratuit.component.scss']
})
export class AjoutPdfGratuitComponent 
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
      this.essai.delete('pdf'); // Supprimer l'image précédente s'il y en a une
      this.essai.append('pdf', event.target.files[0]); // Ajouter la nouvelle image
    }
  }

  onSubmit()
  {
    const id_formation = this.route.snapshot.params['id'];

    this.admin.ajoutPdfGratuit(this.essai, id_formation)
  } 


  onConnect()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }

}
