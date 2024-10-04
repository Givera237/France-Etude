import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Repertoire } from 'src/app/formation/models/repertoire';
import { AdministrateurServices } from '../../services/administrateur-service';


@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent 
{
  titre!: string[]
  mailForm!: FormGroup;
  rechercheForm!: FormGroup
  noms: string[] = [];
  recherches: string = '';

  constructor
  (
   private http : HttpClient, 
   private route : ActivatedRoute,
   private formbuilder : FormBuilder,
   private admin : AdministrateurServices,
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

      this.rechercheForm = this.formbuilder.group
      (
        {
          pseudo: [null],
        }
      ) ;

    const id_formation = this.route.snapshot.params['id']; // http://localhost:3000/api/ https://franceétudes.com:3000/
    this.http.get<string[]>('https://franceétudes.com:3000/api/liste/titre_repertoire').subscribe(reponse  => 
      {
        this.titre = reponse;
      }
      );

    this.admin.getNoms().subscribe(
      (data: string[]) =>
      {
        this.noms = data; // Assurez-vous que les données sont un tableau de chaînes
      },
      (error) => 
      {
        console.error('Erreur lors de la récupération des noms:', error);
      }
    );

  } 


  get nomsFiltres(): string[] 
  {
    return this.noms.filter(nom => 
      nom.toLowerCase().includes(this.recherches.toLowerCase())
    );
  }
  
  recherche()
  {
    const obj = this.rechercheForm.value;
    this.admin.recherchePseudo(obj)
  }

  Submit(nom : string)
  {
    this.mailForm.value.adresse_visiteur = nom
    const obj = this.mailForm.value;
   this.admin.abonnement(obj)
  }
}
