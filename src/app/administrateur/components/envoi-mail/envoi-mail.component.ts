import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdministrateurServices } from '../../services/administrateur-service';


@Component({
  selector: 'app-envoi-mail',
  templateUrl: './envoi-mail.component.html',
  styleUrls: ['./envoi-mail.component.scss']
})
export class EnvoiMailComponent 
{
  mailForm!: FormGroup;
  mailform = new FormData();
  message!: string;
  suject!: string;
  annee!: string;
  constructor(
              private formbuilder : FormBuilder,
              private admin : AdministrateurServices
              ){}

    ngOnInit() :void
    {
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

  }

