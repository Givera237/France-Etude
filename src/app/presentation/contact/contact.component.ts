import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent 
{

    contactForm!: FormGroup;
    confirmationMessage: boolean = false
  
    constructor
    (
     private formbuilder : FormBuilder,
    private http : HttpClient,
    private router : Router, 
    ){}

    ngOnInit() : void
    {
  
      this.contactForm = this.formbuilder.group
      (
        {
          nom: [null,[Validators.required]],
          prenom: [null,[Validators.required]],
          email: [null,[Validators.required]],
          telephone: [null,[Validators.required]],
          pays: [null,[Validators.required]],
          motif: [null,[Validators.required]],
          indicatif: [null,[Validators.required]],

        }
      ) ;
    } 


    onSubmit()
    {
      const obj = this.contactForm.value;
      this.http.post('https://franceétudes.com:3000/api/creation/reservation', obj, { observe: 'response' }).subscribe
        (
          (response: HttpResponse<any>) => 
          {
            this.confirmationMessage = true;
          },
          error => 
          {  
          } 
        ) ;  
    }

    accueil()
    {
      this.router.navigateByUrl(``);
    }





















  countryCodes = [
    { code: '+237', country: 'Cameroun', flag: '🇨🇲' },
    { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
    { code: '+355', country: 'Albanie', flag: '🇦🇱' },
    { code: '+213', country: 'Algérie', flag: '🇩🇿' },
    { code: '+1', country: 'Allemagne', flag: '🇩🇪' },
    { code: '+1', country: 'Andorre', flag: '🇦🇩' },
    { code: '+54', country: 'Argentine', flag: '🇦🇷' },
    { code: '+374', country: 'Arménie', flag: '🇦🇲' },
    { code: '+61', country: 'Australie', flag: '🇦🇺' },
    { code: '+43', country: 'Autriche', flag: '🇦🇹' },
    { code: '+994', country: 'Azerbaïdjan', flag: '🇦🇿' },
    { code: '+1', country: 'Bahamas', flag: '🇧🇸' },
    { code: '+973', country: 'Bahreïn', flag: '🇧🇭' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+1', country: 'Barbade', flag: '🇧🇧' },
    { code: '+32', country: 'Belgique', flag: '🇧🇪' },
    { code: '+501', country: 'Belize', flag: '🇧🇿' },
    { code: '+229', country: 'Bénin', flag: '🇧🇯' },
    { code: '+1', country: 'Bermudes', flag: '🇧🇲' },
    { code: '+591', country: 'Bolivie', flag: '🇧🇴' },
    { code: '+387', country: 'Bosnie-Herzégovine', flag: '🇧🇦' },
    { code: '+55', country: 'Brésil', flag: '🇧🇷' },
    { code: '+673', country: 'Brunei', flag: '🇧🇳' },
    { code: '+359', country: 'Bulgarie', flag: '🇧🇬' },
    { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+257', country: 'Burundi', flag: '🇧🇮' },
    { code: '+855', country: 'Cambodge', flag: '🇰🇭' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+34', country: 'Espagne', flag: '🇪🇸' },
    { code: '+236', country: 'République Centrafricaine', flag: '🇨🇫' },
    { code: '+242', country: 'République du Congo', flag: '🇨🇬' },
    { code: '+243', country: 'République Démocratique du Congo', flag: '🇨🇩' },
    { code: '+41', country: 'Suisse', flag: '🇨🇭' },
    { code: '+57', country: 'Colombie', flag: '🇨🇴' },
    { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
    { code: '+53', country: 'Cuba', flag: '🇨🇺' },
    { code: '+357', country: 'Chypre', flag: '🇨🇾' },
    { code: '+420', country: 'République tchèque', flag: '🇨🇿' },
    { code: '+45', country: 'Danemark', flag: '🇩🇰' },
    { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
    { code: '+1', country: 'Dominique', flag: '🇩🇲' },
    { code: '+593', country: 'Équateur', flag: '🇪🇨' },
    { code: '+20', country: 'Égypte', flag: '🇪🇬' },
    { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
    { code: '+291', country: 'Érythrée', flag: '🇪🇷' },
    { code: '+372', country: 'Estonie', flag: '🇪🇪' },
    { code: '+251', country: 'Éthiopie', flag: '🇪🇹' },
    { code: '+358', country: 'Finlande', flag: '🇫🇮' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+241', country: 'Gabon', flag: '🇬🇦' },
    { code: '+220', country: 'Gambie', flag: '🇬🇲' },
    { code: '+995', country: 'Géorgie', flag: '🇬🇪' },
    { code: '+49', country: 'Allemagne', flag: '🇩🇪' },
    { code: '+30', country: 'Grèce', flag: '🇬🇷' },
    { code: '+1', country: 'Grenade', flag: '🇬🇩' },
    { code: '+590', country: 'Guadeloupe', flag: '🇬🇵' },
    { code: '+1', country: 'Guam', flag: '🇬🇺' },
    { code: '+224', country: 'Guinée', flag: '🇬🇼' },
    { code: '+245', country: 'Guinée-Bissau', flag: '🇬🇼' },
    { code: '+592', country: 'Guyana', flag: '🇬🇾' },
    { code: '+509', country: 'Haïti', flag: '🇭🇹' },
    { code: '+39', country: 'Italie', flag: '🇮🇹' },
    { code: '+1', country: 'Jamaïque', flag: '🇯🇲' },
    { code: '+81', country: 'Japon', flag: '🇯🇵' },
    { code: '+962', country: 'Jordanie', flag: '🇯🇴' },
    { code: '+7', country: 'Kazakhstan', flag: '🇰🇿' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+686', country: 'Kiribati', flag: '🇰🇷' },
    { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+371', country: 'Lettonie', flag: '🇱🇻' },
    { code: '+370', country: 'Lituanie', flag: '🇱🇹' },
    { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
    { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
    { code: '+265', country: 'Malawi', flag: '🇲🇼' },
    { code: '+60', country: 'Malaisie', flag: '🇲🇾' },
    { code: '+960', country: 'Maldives', flag: '🇲🇻' },
    { code: '+223', country: 'Mali', flag: '🇲🇱' },
    { code: '+356', country: 'Malte', flag: '🇲🇹' },
    { code: '+1', country: 'Manhattan', flag: '🇺🇸' },
    { code: '+52', country: 'Mexique', flag: '🇲🇽' },
    { code: '+691', country: 'Micronésie', flag: '🇫🇲' },
    { code: '+1', country: 'Montserrat', flag: '🇲🇸' },
    { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
    { code: '+264', country: 'Namibie', flag: '🇳🇦' },
    { code: '+674', country: 'Nauru', flag: '🇳🇷' },
    { code: '+977', country: 'Népal', flag: '🇳🇵' },
    { code: '+31', country: 'Pays-Bas', flag: '🇳🇱' },
    { code: '+507', country: 'Panama', flag: '🇵🇦' },
    { code: '+51', country: 'Pérou', flag: '🇵🇪' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+48', country: 'Pologne', flag: '🇵🇱' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+1', country: 'Porto Rico', flag: '🇵🇷' },
    { code: '+7', country: 'Russie', flag: '🇷🇺' },
    { code: '+40', country: 'Roumanie', flag: '🇷🇴' },
    { code: '+421', country: 'Slovaquie', flag: '🇸🇰' },
    { code: '+386', country: 'Slovénie', flag: '🇸🇮' },
    { code: '+46', country: 'Suède', flag: '🇸🇪' },
    { code: '+41', country: 'Suisse', flag: '🇨🇭' },
    { code: '+44', country: 'Royaume-Uni', flag: '🇬🇧' },
    { code: '+1', country: 'Saint-Barthélemy', flag: '🇧🇱' },
    { code: '+1', country: 'Saint-Kitts-et-Nevis', flag: '🇰🇳' },
    { code: '+1', country: 'Saint-Vincent-et-les-Grenadines', flag: '🇻🇨' },
    { code: '+685', country: 'Samoa', flag: '🇼🇸' },
    { code: '+378', country: 'Saint-Marin', flag: '🇸🇲' },
    { code: '+239', country: 'São Tomé-et-Principe', flag: '🇸🇹' },
    { code: '+966', country: 'Arabie Saoudite', flag: '🇸🇦' },
    { code: '+221', country: 'Sénégal', flag: '🇸🇳' },
    { code: '+381', country: 'Serbie', flag: '🇷🇸' },
    { code: '+248', country: 'Seychelles', flag: '🇸🇨' },
    { code: '+232', country: 'Sierra Leone', flag: '🇸🇱' },
    { code: '+65', country: 'Singapour', flag: '🇸🇬' },
    { code: '+421', country: 'Slovaquie', flag: '🇸🇰' },
    { code: '+386', country: 'Slovénie', flag: '🇸🇮' },
    { code: '+677', country: 'Salomon', flag: '🇸🇧' },
    { code: '+252', country: 'Somalie', flag: '🇸🇴' },
    { code: '+27', country: 'Afrique du Sud', flag: '🇿🇦' },
    { code: '+34', country: 'Espagne', flag: '🇪🇸' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+1', country: 'Saint-Pierre-et-Miquelon', flag: '🇵🇲' },
    { code: '+249', country: 'Soudan', flag: '🇸🇩' },
    { code: '+211', country: 'Soudan du Sud', flag: '🇸🇸' },
    { code: '+268', country: 'Eswatini', flag: '🇸🇿' },
    { code: '+41', country: 'Suisse', flag: '🇨🇭' },
    { code: '+1', country: 'Turks-et-Caicos', flag: '🇹🇨' },
    { code: '+90', country: 'Turquie', flag: '🇹🇷' },
    { code: '+993', country: 'Turkménistan', flag: '🇹🇲' },
    { code: '+688', country: 'Tuvalu', flag: '🇹🇻' },
    { code: '+256', country: 'Ouganda', flag: '🇺🇬' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
    { code: '+1', country: 'États-Unis', flag: '🇺🇸' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    { code: '+998', country: 'Ouzbékistan', flag: '🇺🇿' },
    { code: '+678', country: 'Vanuatu', flag: '🇻🇺' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+678', country: 'Vanuatu', flag: '🇻🇺' },
    { code: '+967', country: 'Yémen', flag: '🇾🇪' },
    { code: '+260', country: 'Zambie', flag: '🇿🇲' },
    { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
  ];
}
