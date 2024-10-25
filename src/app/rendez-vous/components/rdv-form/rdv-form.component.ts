import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServices } from 'src/app/cookie.service';
import { ListeCreneaux } from '../../models/liste-creneaux';
import { RendezVousService } from '../../services/rendez-vous-service';
import { DateIndisponible } from '../../models/date-indisponible';



@Component({
  selector: 'app-rdv-form',
  templateUrl: './rdv-form.component.html',
  styleUrls: ['./rdv-form.component.scss']
})
export class RdvFormComponent 
{
  selected!: any  ;
  selectedOption: string = 'case1'; // Valeur par défaut
  admin!: string;
  isClicked: boolean = false;
  submitted: number = 0; // Indique si le formulaire a été soumis
  azerty!: any
  creneau = 60
  prix!: number
  objet!: string
  email!: string
  liste_creneau!: ListeCreneaux[]
  rdvForm !: FormGroup;
  phoneForm!: FormGroup;
  selectedButtonId: number = 0; // Par défaut, le premier bouton est sélectionné
  selectedType: string | null = null;
  selectedTarif: number | null = null;
  selectedTarif1: number | null = null;
  selectedTarif2: number | null = null;
  blockedDate!: DateIndisponible[]
 // datesArray : Date[] = this.rdv.getJourIndisponible()
  blockedDates: Date[] = 
  [
    new Date('2024-08-06'),
    new Date('2024-09-16'), // Exemple de date à bloquer
    new Date('2024-08-15')
  ];

  rendezVousTypes = 
  [
    { type: 'Visa', tarif: 69,tarif2: 99,tarif3: 149,  },
    { type: 'Accompagnement Campus France', tarif: 249,tarif2: 499,tarif3: null,  },
    { type: 'Entretien Campus France', tarif: 29, tarif2: 49,tarif3: null, },
    { type: 'Recherche de logement', tarif: 299, tarif2: null,tarif3: null, },
    { type: 'Recheche de Job étudiant', tarif: 149, tarif2: null,tarif3: null, },
  ];


  constructor
  (
    private http : HttpClient,
    private formbuilder : FormBuilder,
    private cookieService: CookieServices,
    private router : Router,
    private rdv : RendezVousService,
   ){}

  ngOnInit()
  {
    const test = new Date()
      this.admin = this.cookieService.getCookie('status');
    /*
      this.http.get<DateIndisponible[]>('https://franceétudes.com:3000/api/liste/jour_indisponible').subscribe(reponse  => 
        {
          this.blockedDate = reponse
        }
        );
        */
      this.rdvForm = this.formbuilder.group
      (
        {
          date_debut: ['',[Validators.required]],
          duree: [null] ,
          type: [null,[Validators.required]] ,
          nom: ['',[Validators.required]] ,
          email: ['',[Validators.required]] ,
          telephone: [null] ,
          prix: [''] ,
          objet: ['',[Validators.required]] ,

        }
      ) ;
      this.rdvForm.value.date_debut = this.selected
      this.rdvForm.value.duree = this.creneau

      this.phoneForm = this.formbuilder.group
      (
        {
          selectedCode: [this.countryCodes[0].code], // Code par défaut
          phoneNumber: [''] // Numéro de téléphone par défaut
       }
      );
     // this.loadBlockedDates();

  }

  // Méthode pour mettre à jour le tarif en fonction du type sélectionné
  onTypeChange(event: Event) 
  {
    const selectElement = event.target as HTMLSelectElement;
    const selected = this.rendezVousTypes.find(rdv => rdv.type === selectElement.value);
    this.selectedType = selected ? selected.type : null;
    this.selectedTarif = selected ? selected.tarif : null;
    this.selectedTarif1 = selected ? selected.tarif2 : null;
    this.selectedTarif2 = selected ? selected.tarif3 : null;
    if(this.selectedType==='Recherche de logement' )
    {
      this.prix = 299
      this.objet = this.selectedType
    }
    if(this.selectedType==='Recheche de Job étudiant' )
      {
        this.prix = 149
      }
    if(this.selectedType==='Entretien Campus France' )
      {
        this.objet = this.selectedType
      }
    if(this.selectedType==='Accompagnement Campus France' )
      {
        this.objet = this.selectedType
      }  
    if(this.selectedType==='Visa' )
      {
        this.objet = this.selectedType
      }
  }
/*

   firstAsyncTask(): Promise<Date[]> 
   {
    return new Promise
    (resolve => 
      {
      setTimeout
      (() => 
        {
          this.datesArray = this.rdv.getJourIndisponible()
          resolve();
        },
        1000
      );
     }
    );
    return this.datesArray
  }

   secondTask(date: Date) 
   {
    const isBlockedDate = this.rdv.datesArray.some(blockedDate => 
      blockedDate.getFullYear() === date.getFullYear() &&
      blockedDate.getMonth() === date.getMonth() &&
      blockedDate.getDate() === date.getDate()
    );
   }

   async  exampleFunction() 
   {
    await this.firstAsyncTask(); // Attend que la première tâche soit terminée
    this.secondTask(); // S'exécute après
  } 
  */
/*
  public blockedDatese: DateIndisponible[] = [];


  loadBlockedDates() {
    this.rdv.getBlockedDates().subscribe(
      (dates: DateIndisponible[]) => 
      {
        // Convertir les dates reçues en objets Date
        this.blockedDatese = dates.map(dateStr => new DateIndisponible(dateStr));
        console.log('mon test', this.blockedDatese)
      },
      error => 
      {
        console.error('Erreur lors de la récupération des dates bloquées:', error);
      }
    );
  }
*/


dateFilter = (date: Date): boolean => 
  {
    // Bloquer les dimanches
  //  const isSunday = date.getDay() === 0; // 0 = Dimanche

    // Vérifier si la date est dans la liste des dates bloquées
    const isBlockedDate = this.blockedDates.some
    (
      blockedDate => 
      blockedDate.getFullYear() === date.getFullYear() &&
      blockedDate.getMonth() === date.getMonth() &&
      blockedDate.getDate() === date.getDate()
    );
    // Retourne false si c'est un dimanche ou une date bloquée
    //return !isSunday && !isBlockedDate;
    return !isBlockedDate;
  }

  onButtonClick(buttonId: number, valeur : number, prix : number ) 
  {
    this.selectedButtonId = buttonId;
    this.creneau = valeur
    this.prix = prix
  }

  creneauDispo()
  {

    this.rdvForm.value.telephone = '' + this.phoneForm.value.selectedCode + this.phoneForm.value.phoneNumber;

    this.rdvForm.value.date_debut = this.selected


    this.rdvForm.value.duree = this.creneau
    this.rdvForm.value.prix = this.prix
    this.rdvForm.value.objet = this.objet
    this.email = this.rdvForm.value.email
    this.submitted = 1; // Marquer le formulaire comme soumis

    // Vérifier si le formulaire est valide
    if (((this.rdvForm.value.email === '') || (this.rdvForm.value.nom === '') || (this.rdvForm.value.objet === null) || (this.rdvForm.value.date_debut === undefined) || (this.rdvForm.value.type === 'case1'))) 
    {
      return;
    }
    const rdv = 
    {
      jour : this.selected ,
      duree : this.creneau
    } 
    
    this.http.post(`https://franceétudes.com:3000/api/liste/credo`, rdv, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          this.liste_creneau = response.body
          this.rdv.setListeCreneau(this.liste_creneau)
          this.rdv.setRdv(this.rdvForm.value)
          this.rdv.setDateDebut(this.selected)
          this.rdv.setEmail(this.email)

          this.router.navigateByUrl(`rdv/creneau`);
        }
        else 
        {
          console.log('merde combi');
        }
      },
      error => 
      {
        console.error(error); // Afficher l'erreur à l'utilisateur
      }
    ) 
      
  }

  listeReservation()
  {
    this.router.navigateByUrl(`rdv/liste`);
  }
  entrerCreneau()
  {
    this.router.navigateByUrl(`rdv/entrer_creneau`);
  }
  mesRdv()
  {
    this.router.navigateByUrl(`rdv/mes_rdv`);
  }

  myFilter = (d: Date | null): boolean => 
  {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

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
