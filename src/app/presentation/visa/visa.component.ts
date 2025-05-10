import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visa',
  imports: [],
  templateUrl: './visa.component.html',
  styleUrl: './visa.component.scss'
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
