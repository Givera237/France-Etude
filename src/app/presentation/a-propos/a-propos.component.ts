import { Component } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-a-propos',
  imports: [],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.scss'
})
export class AProposComponent 
{
  videoPlaying: boolean = false;



  ngOnInit() : void
  {
    AOS.init();

    setTimeout(() => {
      this.videoPlaying = true;
    }, 1000); // Définir le délai avant la lecture automatique
  }
  
}
