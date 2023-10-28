import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.scss']
})
export class AProposComponent
{
  ngOnInit() : void
  {
    AOS.init();
  }
}
