import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirme-rdv',
  templateUrl: './confirme-rdv.component.html',
  styleUrls: ['./confirme-rdv.component.scss']
})
export class ConfirmeRdvComponent 
{
  email!: string

  constructor(
    private route : ActivatedRoute,
    private router : Router, 
   ){}

   ngOnInit()
   {
    this.email = this.route.snapshot.params['id'];
   }


  //http://localhost:4200/formation/3 https://franceétudes.com http://localhost:3000 https://franceétudes.com:3000
  onSubmit()
  {
    this.router.navigateByUrl(`rdv/rdv_form`);

  }
}
