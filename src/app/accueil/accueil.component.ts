import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent
 {
    ngOnInit() : void
    {
      AOS.init();
    }

    imgCollection: Array<object> = [
      {
        image: '/assets/sorbonne.jpg',
        thumbImage: '/assets/sorbonne.jpg',
        alt: 'Choix de votre université',
        title: 'Choix de votre université'
      }, {
        image: '/assets/campus france.png',
        thumbImage: '/assets/campus france.png',
        title: 'Procédure Campus France',
        alt: 'obtenir des acceptations sur Campus France'
      }, {
        image: '/assets/agent-immobilier-rediger-cv-1200x628.jpg',
        thumbImage: '/assets/agent-immobilier-rediger-cv-1200x628.jpg',
        title: 'Obtention de logement',
        alt: 'Obtenir un logement en France'
      }, {
        image: '/assets/Visa.jpeg',
        thumbImage: '/assets/Visa.jpeg',
        title: 'Obtention de votre visa ',
        alt: 'Visa pour la France'
      }
  ];
}
