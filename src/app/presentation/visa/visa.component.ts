import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss']
})
export class VisaComponent 
{

    constructor(
      private router : Router,
      ){}

  onViewFormation()
  {
    this.router.navigateByUrl(`formation/liste`);
  }
}
