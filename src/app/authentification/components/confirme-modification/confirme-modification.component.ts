import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirme-modification',
  imports: [],
  templateUrl: './confirme-modification.component.html',
  styleUrl: './confirme-modification.component.scss'
})
export class ConfirmeModificationComponent 
{
  constructor
  (
    private router : Router, 
   ){}

  onSubmit()
  {
    this.router.navigateByUrl(`authentification/connexion`);
  }
}
