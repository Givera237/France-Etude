import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campus-france',
  imports: [],
  templateUrl: './campus-france.component.html',
  styleUrl: './campus-france.component.scss'
})
export class CampusFranceComponent 
{
  constructor(
    private router : Router,
    ){}
onViewFormation()
{
this.router.navigateByUrl(`formation/liste`);
}
}
