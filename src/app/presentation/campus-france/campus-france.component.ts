import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatDivider } from '@angular/material/divider';


@Component({
  selector: 'app-campus-france',
  templateUrl: './campus-france.component.html',
  styleUrls: ['./campus-france.component.scss']
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



