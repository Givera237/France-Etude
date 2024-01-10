import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/authentification/models/utilisateurs';
import { Repertoire } from 'src/app/formation/models/repertoire';


@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent 
{
  essai = new FormData();
  adresse_visiteur!: string
  utilisateur!: Utilisateur[]
  repertoire!: Repertoire[]
  titre!: string[]
  titre_repertoire!: string

  mailForm!: FormGroup;

  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private formbuilder : FormBuilder,
   private router : Router,
  ){}

  ngOnInit() : void
  {
    this.mailForm = this.formbuilder.group
      (
        {
          adresse_visiteur: [null],
          titre_repertoire: [null], 
        }
      ) ;



    const id_formation = this.route.snapshot.params['id'];
    this.http.get<string[]>('http://localhost:3000/api/liste/titre_repertoire').subscribe(reponse  => 
      {
        this.titre = reponse;
        console.log('reponse titre ', reponse)
        //console.log('repertoire ', this.titre)
      }
      );
      this.http.get<Utilisateur[]>('http://localhost:3000/api/liste/adresse_mail').subscribe(reponse  => 
      {
        this.utilisateur = reponse;
        console.log('reponse utilisateur ', reponse)
       // console.log('utilisateurs ', this.utilisateur)
      }
      );
  } 
  

  onSubmit()
  {
    const id_formation = +this.route.snapshot.params['id'];

    this.essai.append('titre_repertoire', this.titre_repertoire);
    this.essai.append('adresse_visiteur', this.adresse_visiteur);
    


    console.log(this.essai)
    this.http.post(`http://localhost:3000/api/creation/abonnement`, this.essai, { observe: 'response' }).subscribe
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


  Submit()
  {
    const obj = this.mailForm.value;
    console.log(obj);
    this.http.post('http://localhost:3000/api/creation/abonnement', obj, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log('Abonnement réussi');
          this.router.navigateByUrl(`formation/payante`);
        }
        
      },
      error => 
      {
        
        if (error.status === 404) 
        {
          console.log(error);
        //  console.log(error.statusText)
          //this.router.navigateByUrl(`authentification/login`);
        }
        if (error.status === 500) 
        {
        //  console.log(error.statusText)
          //this.router.navigateByUrl(`authentification/login`);
        }
        console.error(error.body); // Afficher l'erreur à l'utilisateur
      } 
    ) ;  

  }

 
}
