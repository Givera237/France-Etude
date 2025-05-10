import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConfidentialiteComponent } from './core/confidentialite/confidentialite.component';
import { MentionLegalesComponent } from './core/mention-legales/mention-legales.component';
import { ListeFormationPayanteComponent } from './formation/components/formation-payante/formation-payante.component';
import { ListeFormationComponent } from './formation/components/liste-formation/liste-formation.component';
import { MesFormationsComponent } from './formation/components/mes-formations/mes-formations.component';
import { FormationUniqueComponent } from './formation/components/formation-unique/formation-unique.component';
import { AProposComponent } from './presentation/a-propos/a-propos.component';
import { CampusFranceComponent } from './presentation/campus-france/campus-france.component';
import { ContactComponent } from './presentation/contact/contact.component';
import { FaqsComponent } from './presentation/faqs/faqs.component';
import { VisaComponent } from './presentation/visa/visa.component';
import { AfficheErreurComponent } from './authentification/components/affiche-erreur/affiche-erreur.component';
import { CodeEmailComponent } from './authentification/components/code-email/code-email.component';
import { ConfirmeModificationComponent } from './authentification/components/confirme-modification/confirme-modification.component';
import { ConnexionComponent } from './authentification/components/connexion/connexion.component';
import { EntreEmailPerduComponent } from './authentification/components/entre-email-perdu/entre-email-perdu.component';
import { InscriptionComponent } from './authentification/components/inscription/inscription.component';
import { NouvelIdentifiantComponent } from './authentification/components/nouvel-identifiant/nouvel-identifiant.component';
import { VerificationEmailComponent } from './authentification/components/verification-email/verification-email.component';
import { AjoutFormationComponent } from './administrateur/components/ajout-formation/ajout-formation.component';
import { AbonnementComponent } from './administrateur/components/abonnement/abonnement.component';
import { AjoutPayantComponent } from './administrateur/components/ajout-payant/ajout-payant.component';
import { AjoutPdfGratuitComponent } from './administrateur/components/ajout-pdf-gratuit/ajout-pdf-gratuit.component';
import { AjoutVideoGratuiteComponent } from './administrateur/components/ajout-video-gratuite/ajout-video-gratuite.component';
import { EnvoiMailComponent } from './administrateur/components/envoi-mail/envoi-mail.component';
import { ListeAbonnementComponent } from './administrateur/components/liste-abonnement/liste-abonnement.component';
import { ListeVideoComponent } from './administrateur/components/liste-video/liste-video.component';
import { ModifierFormationComponent } from './administrateur/components/modifier-formation/modifier-formation.component';
import { ModifierRepertoireComponent } from './administrateur/components/modifier-repertoire/modifier-repertoire.component';
import { UploadPdfComponent } from './administrateur/components/upload-pdf/upload-pdf.component';
import { UploadVideoPayanteComponent } from './administrateur/components/upload-video-payante/upload-video-payante.component';
import { FormationPayanteComponent } from './administrateur/components/formation-payante/formation-payante.component';

export const routes: Routes = 
[
    /**************************Core*********************************** */

    {path : '', component : AccueilComponent},
    {path : 'confidentialite', component : ConfidentialiteComponent},
    {path : 'mentions légales', component : MentionLegalesComponent},
    
    /**************************Formation*********************************** */

    {path : 'formation/payante', component : ListeFormationPayanteComponent},
    {path : 'formation/liste', component : ListeFormationComponent},
    {path : 'formation/mes_formations', component : MesFormationsComponent},
    {path : 'formation/:id', component : FormationUniqueComponent},

    /**************************à propos*********************************** */

    {path : 'accueil/a_propos', component : AProposComponent},
    {path : 'accueil/campus_france', component : CampusFranceComponent},
    {path : 'accueil/visa', component : VisaComponent},
    {path : 'accueil/contact', component : ContactComponent},
    {path : 'accueil/faqs', component : FaqsComponent},


    /**************************Authentification*********************************** */


    {path : 'authentification/inscription', component : InscriptionComponent},
    {path : 'authentification/connexion', component : ConnexionComponent},
    {path : 'authentification/entre_email', component : EntreEmailPerduComponent},
    {path : 'authentification/code_email/:id', component : CodeEmailComponent},
    {path : 'authentification/nouvel_identifiant/:id', component : NouvelIdentifiantComponent},
    {path : 'authentification/verification', component : VerificationEmailComponent},
    {path : 'authentification/erreur', component : AfficheErreurComponent},
    {path : 'authentification/confirmation', component : ConfirmeModificationComponent},


     /**************************Administrateur*********************************** */

    {path : 'admin/ajout', component : AjoutFormationComponent},
    {path : 'admin/ajout_pdf/:id', component : AjoutPdfGratuitComponent},
    {path : 'admin/ajout_video/:id', component : AjoutVideoGratuiteComponent},
    {path :'admin/ajout_payant', component : AjoutPayantComponent },
    {path : 'admin/formation_payante/:id', component : FormationPayanteComponent},
    {path : 'admin/up_video/:id', component : UploadVideoPayanteComponent},
    {path : 'admin/up_pdf/:id', component : UploadPdfComponent},
    {path : 'admin/liste_video/:id', component : ListeVideoComponent},
    {path : 'admin/liste_abonne/:id', component : ListeAbonnementComponent},
    {path : 'admin/abonnement', component : AbonnementComponent},
    {path : 'admin/modifier/:id', component: ModifierFormationComponent},
    {path : 'admin/modifier_repertoire/:id', component: ModifierRepertoireComponent},
    {path : 'admin/mail', component : EnvoiMailComponent}

];
