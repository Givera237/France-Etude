import { Component } from '@angular/core';


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
    setTimeout(() => {
      this.videoPlaying = true;
    }, 1000); // Définir le délai avant la lecture automatique
  }
  
}
