import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


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
  constructor(
              private router : Router, 
              private formbuilder : FormBuilder,
              private http : HttpClient
              ){}

    ngOnInit() :void
    {
      this.mailForm = this.formbuilder.group
      (
        {
          subject: [null],
          message: [null],     
        }
      ) ;
    }      
    
    onSubmit()
    {
      const obj = this.mailForm.value;
      console.log(obj);
      this.http.post('http://localhost:3000/api/sendmail/1', obj, { observe: 'response' }).subscribe
      (
        (response: HttpResponse<any>) => 
        {
          if (response.status === 200) 
          {
            console.log('yes mail envoyé');
            //this.router.navigateByUrl(``);
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

    Submit()
    {
  
      this.mailform.append('suject', this.suject);
      this.mailform.append('message', this.message);
  
      console.log(this.mailform)
      this.http.post(`http://localhost:3000/api/sendmail/1`, this.mailform, { observe: 'response' }).subscribe
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
}
