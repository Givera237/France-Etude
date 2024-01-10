import { Component } from '@angular/core';
import { CookieService } from 'src/app/cookie.service';

@Component({
  selector: 'app-campus-france',
  templateUrl: './campus-france.component.html',
  styleUrls: ['./campus-france.component.scss']
})
export class CampusFranceComponent 
{
  constructor(private cookieService: CookieService){}

  ngOnInit(): void
  {
    const username = this.cookieService.getCookie('username');
    console.log(username); // Affiche 'JohnDoe'
  }
}
