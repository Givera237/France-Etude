import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../service/authentification-service';

@Component({
  selector: 'app-entre-email-perdu',
  imports: [ReactiveFormsModule],
  templateUrl: './entre-email-perdu.component.html',
  styleUrl: './entre-email-perdu.component.scss'
})
export class EntreEmailPerduComponent 
{
  verificationForm!: FormGroup;
  erreur!:string;
  connexion!: string;
  cookie!: any;
  pseudo!: string;
  passwordVisible = false;

  constructor(
              private formbuilder : FormBuilder,
              private auth : AuthentificationService  ,
              private http : HttpClient,
              private router : Router, 
             ){}

  ngOnInit() :void
  {
    this.erreur = '';

    this.verificationForm = this.formbuilder.group
    (
      {
        email: [null], 
      }
    ) ;
  }

  onSubmit()
  {
   const obj = this.verificationForm.value;
   this.router.navigateByUrl(`authentification/code_email/${obj.email}`);
  }
}
