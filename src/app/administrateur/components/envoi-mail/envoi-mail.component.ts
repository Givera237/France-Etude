import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from '../../../cookie.service';
import { AdministrateurServices } from '../../service/administrateur-service';

@Component({
  selector: 'app-envoi-mail',
  imports: [ReactiveFormsModule],
  templateUrl: './envoi-mail.component.html',
  styleUrl: './envoi-mail.component.scss'
})
export class EnvoiMailComponent 
{
  mailForm!: FormGroup;
  mailform = new FormData();
  message!: string;
  suject!: string;
  annee!: string;
  admi!: string;

  constructor
  (
    private formbuilder : FormBuilder,
    private admin : AdministrateurServices,
    private router : Router,
    private cookieService: CookieServices,
  ){}

    ngOnInit() :void
    {

      this.admi = this.cookieService.getCookie('status');
      
      this.mailForm = this.formbuilder.group
      (
        {
          subject: [null],
          message: [null], 
          annee: [null]    
        }
      ) ;
    }      
    
    onSubmit()
    {
      const obj = this.mailForm.value;
      this.admin.envoieMail(obj)
    }

    onConnect()
    {
      this.router.navigateByUrl(`authentification/connexion`);
    }
}
