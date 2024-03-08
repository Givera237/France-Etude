import { Component} from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.scss']
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
