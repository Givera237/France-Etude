import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirme-modification',
  templateUrl: './confirme-modification.component.html',
  styleUrls: ['./confirme-modification.component.scss']
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
