import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as AOS from 'aos';
import { HttpClient,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Utilisateur } from '../authentification/models/utilisateurs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent
 {
  inscriptionForm!: FormGroup;
  utilisateur!: Utilisateur;
  pseudo!: string;
  emailRegex!: RegExp;
  erreur!: string;
  imagePath!: string

  constructor(
    private cookieService: CookieService,
    private http : HttpClient, 
   private formbuilder : FormBuilder,
   private router : Router,
             ){}

    ngOnInit() : void
    {
      AOS.init();

      this.erreur = "";
      this.inscriptionForm = this.formbuilder.group
      (
        {
          pseudo: [null,[Validators.required]],
          email: [null,[Validators.required]],
        }
      ) ;

       this.imagePath = 
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA8gMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EAEIQAAEDAgIGBQgIBQQDAAAAAAEAAgMEERIhBRMxQVFhInGBkZIUMlJUYqHR0gYzQnKCscHwI0NEU5MVorLhFiQ0/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIhEAAgEEAQUBAQAAAAAAAAAAAAERAgMSE1EEITFBYRQi/9oADAMBAAIRAxEAPwDzLKd5V/J3DaD3JxjfQI7UaO4PSc0jgvXPKkztSRuPcuiNar3B2wBDwt+0y55JgICPJWEabLGnYLclzV8kyZF9Wpq0yI13VphItgUDE0I10RoCRXVrmrTerXNWgJFNWoGJrV8lNWgUgmuLRYLhc470bVruq5IHIo9pdtVNWnTFyXDFyQEiWrTFLM6KRt+lfIg5piOkdI0lpYLZ2c6xK5qCI8eJl/QvmgJG4hTOErXwXYfNOVwOtJV+jBDhdGbscLgXuU7BPhj1b2gDeSuVTJDGG61zxuuRkpUpjkwHRWOxVMfBaHk53mxXGwsD/wCJiI9neqCTOMdlUxrTkhiFwy/buSxisgciZjVSxOGPkqGNAJihYqFicLFQxoKkVwKJjV8l1MJPUQ6LdJk5krXcclZ2hp2DFk4cQQtI6OqadgMc7rjcU1STVcWTomSj2hdc+fDFjyYQ0XNa/R5C+at/plQBfAQOpeuhjiqHAvocLuVwE4dDQzWsaiM8nXCh348misz4PAGlkF7t2I0WjamVuKOBzhyXuJdAYWWZrJeTnAfokToqogdiZTlp+8Smr6ZLsNHlxo2q9Xk6rIclLJGbPjcDzFl63/2WEiVssR5Eq7oBMBjlmPIuv+ae6A1HjBHyVhFyXsToGCbMTva7gWgpcfRqbW2D2lt9oGarfSLRXweY1BsThyHBXZRyPbiZGXdQXoqvQtTSPwNJfG7aWj809SUckBa+AtfxYxtieu4Sd5R2BWnMNHjvI5QLmNwHMLnkr75tsvpTIRM21TS9HkFV2iNHSnEYS33LL9XKNfyv0z5z5L0drQeZRGaNndIGBmZ33yHavpMGjdHxDowxX44AjGkpS3C1rQDuGST6vhDXSP2z5u/QdRGRfA5l7YmOuqu0U5j3gg2aBu2r6VFo2midjjia07rblH6MonyF76djnn7Thcqf1Mr8h88n0HPSmOSwjaRcvdZwHckHQa6bJzC4/bAAC+py0cTwLwsNtmJoNkNmjoWg3jjudpawBOnq+UKrpO/ZnzGajEMoEj8WW0ZhD1jmHJrXN5tK+g1H0bpZHl2rFyb3GVks/wCi0PpOHWbrRdTR7IfTXPR4VzoZARLG4c2qjqemI6Mzhyc1e4P0Vg44utLS/ROKxLbj7pVK/QQ7Fw8S6CMbJC7sshOjbwK9dL9FWjY+TtF0s/6LzfYzG64stFeo5J1V8HlTHfchuj5L1/8A4rUWN7BKVOgX04u8HsCe2h+w11r0eYMao5nJak0AaSA09yA6B23AR2K5RHcz8HJROal3oO7l1UEnvYtNsf8AWUzSnYtJwu82NjeRC882E80ZkZXG7VJor1Z6I6QLmEDB3o8VfM1ove3UvPMxN59iZZK4Cxv3rN2ka032bw0mRmS23MK7NIRy+c6HxrzznOduyVdUXqdKK/Sz0RpaSZ18bQeUiudEwSDJ7r8nLzrKU3GYCdio58N45w3qdYpOiPDHTcnzSaP+htBxNmkC6aCoYbxSkkcc0tG3SEXm1JtzddH8urW2Dg11t5URVyaKqniDr21pyeWnqQgydrrkYrHj/wBKx0hNsMTOxc8ukt9W1EPgHVSFFXM3z43gbgDdWGkHgdOLPmboIr77YWlXFdF/Z7gEYvgea5Ds0hGR0oz3InlsJGeFvWkzXRH+U7wrrauN5tqz2tU4FbPow7SEJyZI0HmmI6mMgfxWHtSJdG7MQg8y1Dd7JDB91GCY82a+uZbzlUzM4hYriR/VNHWhvkIzFS3uRqE7pumdltp7lQ1EY2kjrCwhWytP1hdzUdpCUi2LvAT1Mn9CNZ9fTt/nRg8yEvJXRuF2PZ4gsOYvlNy1p7AlnwXObAOxa02UZVdSzXlqwXdJzM+BKC+pLPNkb3lZeoaOR5KuraNjvctFaRi77Y8dKVbPMj1g32uiDTYItUU7h+G6zDi9Iqjy8i2N3eq1U8C31L2a40jQWuYmi/EAJeqrKWSMhjmi/otBKynNJ2i66JBH5rM/uo1Jewd9vsANICSccufshRH8tl5+EKLTuRI82BFEGScZCithWLrKVEiTYEQQJ4RK4hU5lq2ICBEbDZPNiVhEpyK1CQgVmw22J0RqwjSyZatwJ6t3E967qzxKeEN1DEAlkPAR1S7quSafAXebI5h5f9oT6aqsdXUgm38yMEe6yJDAFqVNSqarTQY0g6NkdbNhjkjz6w535LB+kf0j0voDRjqyr0LTyNMgjZqKx1y6+0gx5Cwvt4dhI8D0kdO6R4a0ZlLyzQx1opLzxzyC7WyxFlwANi83V/SjTDIJC7RE9OWxCQziUPY0G+HY29zY7V5nQOm64V81c2nmr5Y2ue9tyCBvNyDayaUkVfy0oPqFncT1XVTGSvLN+lelnacpdDt0IY6uojdIDNVdBg2jEWs357uHWvQQt0/LHeVmi6cn7N5JSP8AilJToGNSqmBWiptJOLvKayIZ9EwQBuVhtxF2+6PHTOb580j/AL2EfkAjIWsVMHJVMHJaOrCqYwnkLUjMdAqGnWoY1UxKsyHaMkwFVMC1jEFUwZpqsnUY7oVUU4cbXA5lbgo2uF9Y3tC5HTw4rSgdYRtGrLZlN0dG4XFZC08DdHh0U0npTQubyabrU8kpCMo7nrQzFTxn6k9azd1s1VlU+UUGhqC2YK6ra6m4PUSyr5NMLYBlrIzLcUIQv9al8Efyqwik9bl8Efypma7egwtxRQ3qSoik9bk8Efyrojm9bl8EfypFZR6Gxh4hWAHEJMRzeuSf44/lUwzeuS+CP5UR9Hn8HgArtZxWeGzeuy+CP5V20/rsvgj+VKPobPhpkNDVTJIfx/XZfBH8q5acf1svbHH8qFT9HsXBoAAqEAbVmuM/rkv+OP5VUuqfXJfBH8qeItq4NTLiFV7WSAiRgc0/ZIBCzC6p9ck8DPlXC+pH9W/wM+VPEncuBuOhp4quWqaw66XJ7i4m4sBa2zcPfxXZqKkmp307oGiKQ3e1otiN7nYs2WrniaSaqQ29hnyqsFdPMP8A6nt/Cz5U8GLfTPg1oKeGnjjZGwWjbhaTtA4XRS4X2LLx1J/q5PAz5VL1HrcnhZ8qWI9y4NPHyUxeys4a/wBcl8LPlVg2X1uXwM+VGI9vwcLj6KmI+ilMEnrcvhZ8F3VyetyeBnwSgM/gyXDfkoLEbQlTFL62/wDxs+CqYpfXJP8AGz4IgM/g4C1rhmFaXVOIc1wvv3JHVzeuSeBnwUMcvrcngb8Eo+hs+DQcG5CxB5qjwOLe9LaiX1qTwt+C4aeQ7ayW33W/BNJchn8GWPwOubEda7JI6QOLS3qJSRpn+tSeFvwVTSyHZVS+FvwRC5DZVEDFn/22eIKJTyOX1uXwt+CifbkiWF1y7rVltqRxHaump5/7VpgYbTSMyglcdizBUDj7l3XA708RbTT1jv2VNaOKzNZnkrY+fvRiLcaQlHFd1o4rNDiiNJSxQto9rVYPulGI7FLRaqbC3XCVYWshvcAkWccVQk32rj3Zbu9L499imhSCr7AfWEIVEekLSnvVa0XBJKHRDK5NitPRi3/Rsh3DNXaUnjIAyI7UdjhhuXAHmVmzVMODmrXKEx4RbiyRRQuI3rmtsVx6XeqSM6qmhnXDiuGYcUi4n9lULv3dPEnaaOsvscFzGf2Vnayy5rOY708R7TQ1x4qwm5rNNQOKqam29GI1dNTXKa7mB2rMFSDvC4aq28JYD2mpr/ab3qLJ8r5hRLAe0TaSdlz7lCHDl+JKidnp3PBd8qaNma2hnMNNBOZOzmitf7J7Ek2qO5rvzRBUuPmtPUlDCENh/slXBvu96UbPJ6AH4yFZtQPtlo/ESkPFD7SOCKwt4FJMqm3ye49iahq3E2A7Sf0UuS1Shpjm7mOPai4wMw23WVyKV9ung7Aia1tuln1W+KzbNqaVyUD3HcVHWIzIBUdNHbJ/Zf4JKoqmsOQJv6N0DcL2Glc0C2ZPJqVdJK3pWsOaWOkBI5zLhrtgJQ3ie5c6os0bOiB+itIyqfBSrqJTctjy43AQ6SolA6Ubuwgqk7HYScNweYt33Q6aNxZYMsORy/NUZ+zaZLI8C1z2D4pqKTKzwb/dWMBLYFkwFsrWB/RF8vFOQwuxOPKylo0TSNsYdrbHlsUxu3i3YkaesZJkQ4AcTknGTx/3D1XHwUeDRQy+PFtaexBe5nou70fXttYFo7lSSWzbtwHrTkHQuRN5bwt1oTiLZD3oktSWnpAfhKUkqgdru8WVowdKLF3slVx+yUA1Dvslh5YiEM1MhP1dzycrIhB3O4NKG4uGdx3oT6oj0u4ITqzcWvHbZOGEIZGPacx95UJO9L+UMO+3XmuGdhHnogOwxdRKa5npqIgOwmKo7BGO1Hgke4XDLHkVjOrXMAwtF+ZTENZWSNu1jSBuZa6bYJGy1tQ/Y5wHWrmnktdzsR5krPg0pP5j45CeQTQnkeLlkjRxdcKCuxZwkYcomE8XPK62R4PSwtPsi6Sk0gyMgOLiT7Nz+aPTztlFy2Qc7YQqklj7JpduJvULBFZUSXAbe54C3vSjTENkfS4myOyYkdIZjZmpJdcGnG8uAxS4bbtt0wZG4MJfivvtn2LMY5jgLuaSdxVyYo7dGEX322qWhq6GnkhbtdnwFslm1TogSGNO3Po4lJ5sYvihsdxas2paXxENfT4d2Rv+aaQZphHyU/SxvwnZmBf3i6XE1ES3Vmd5F95v7zayDA2WKMkspb8RFd3eboGOpmeHulkwcMZaO7Z7k4HI490WHJ1VH1W/MLkTmDMzVbncL5IbaiQ9EVD2i9i1riFHTuicWtqJcO9peSLoCQusow8ukM7HEbcR/RGjmpsIcx7svSw3/LNZkr6gO1kcjrWJw4yQexMEzzRBxbTONvtxZ+7YgUmxSuje44mm2+zLe9akEkQyDrHja683RxubECXU99jgQcupaVPKGi4MAHJuxJoWcG82SPCRitzAz/NLSSOblHKHDgcktGYpBfDC4/ko4tFwCzj0UoKdwE+peXFpBBHK90GSV9sy23UF18nIX4oDjFtLBi9IWVwSqyjpHfYDCeDslxoe45xsB34ZCgVNS2HaJSONrhDhrxLcNLxbLJtkFJj2omtdrz+EobhUN2ku6zdVfUysFyyUji25CTqNJ1DhhjikFt5RJfYvLMWnpMF+tCNQfQw9SVqK6pYP4rWdRIugCqLxfArTIaNDyj92UWd5R1KJyKCeU4nAMdittOFNB8jbYWNPMZJYki5Y24XYpiTYsfdZhI/CZQ4OBLTvsU3ZziCZCXbsRWdHKAbWeCeO5Ow4rYmO6sRSE6huOB97umuOQAR8LWWJKXYJw24cwt4XKviLiA5gAtvzTIdQx0LWDrroDRvsUq8xAZBwPILrZAxt/O7M0GbYYVLGSWe8C3FFdJHNswvI3E7Emahj7A5HcbKGqDSQ278s7C2aQSVnuHgNGV7XBSskkkYIac72vtKlTPI8XD3MtsuEjJO45XLt5cgpMYMri2z35oEzMDNYbNJ6zdVeTcdKRx4MGxW1rXXAJ2ZghBojkcjrEF4LhbcuyTEjJ3SGWbUvFC9r3GF2Frjm3iu1MD3gMe68QzwbfelJQWFutxea9zcy1osmGSFrbNdbrS7JGRtaCcNtwF/1UHTku10jN93Zj3JkscZI9zQ19idxCbiBxWe27bZm+xZLJnMNhcG9i6ybgnladbrHOzzs0bEGdRtMLYxdzWjKwdfahPqY3SZSA35JcVQLBfE0HiF0VEbCDmTyagmRkhhzLgeanQAzdt6ku6USsuThue1QYLgOxXG/CmCYUhrgQHApeSGUH60kcCAr5h1mtaRxvYqj9fbNzWjdmUGiqA9MXMb+5JSOe2QuGbjzR57gYnuI6s0m+UHIBxPUgvIrI+SxcWhp4nNK+UB3Qc//AGqz5yDhwuJUuSLlvUiRyc1MH91v77FF3E/0GricikDTSPxEYsrJsyuaG4Tt2qKKUJjLPOaNxT9MMsW+6iiDNjIOajnuGxRRAmLNqZDLICRYOIGW5FfI/HhDiBbcuKIEwrMpWjbcXzUqWAbMupRRAjMke4NOw24hZstS8NcBh37lFEMukHDK6SS7iuxASPcX5my6opNUGpRijOZHStkrVMeGNwxONjvPUoogYq8BsbXtycpI8izhkQFFECOxVDy03DTv2LTp5CQNgy3BRRMzqNGlbi84k5DaiSfWgWGzgoomZgg94lw4iRnkc0GapkY1oBHngZhRRADWsNsrDPgpiO2+aiiCkK1ABfnnc2SEpILrHZsUUQUhYyO1Zdle9tiz6mR+NwxHLYookzRFALgG571FFEFn/9k=';

      
    }

    imgCollection: Array<object> = [
      {
        image: '/assets/sorbonne.jpg',
        thumbImage: '/assets/sorbonne.jpg',
        alt: 'Choix de votre université',
        title: 'Choix de votre université'
      }, {
        image: '/assets/oral.jpeg_1698113642442.jpg',
        thumbImage: '/assets/oral.jpeg_1698113642442.jpg',
        title: 'Procédure Campus France',
        alt: 'obtenir des acceptations sur Campus France'
      }, {
        image: '/assets/agent-immobilier-rediger-cv-1200x628.jpg',
        thumbImage: '/assets/agent-immobilier-rediger-cv-1200x628.jpg',
        title: 'Obtention de logement',
        alt: 'Obtenir un logement en France'
      }, {
        image: '/assets/pexels-emily-ranquist-1205651.jpg',
        thumbImage: '/assets/pexels-emily-ranquist-1205651.jpg',
        title: 'Obtention de votre visa ',
        alt: 'Visa pour la France'
      },
  
  ];

  onSubmit() : void
  { 
    const obj = this.inscriptionForm.value;
    this.http.post('http://localhost:3000/api/register', obj, { observe: 'response' }).subscribe
    (
      (response: HttpResponse<any>) => 
      {
        if (response.status === 200) 
        {
          console.log(response.statusText)
          this.router.navigateByUrl(`authentification/connexion`);
        }
        else 
        {
          console.log('merde combi');
        }
      },
      error => 
      {
        console.error(error);
        this.erreur = error.error.message;
        console.log(error.error.message);
         // Afficher l'erreur à l'utilisateur
      } 
    ) ;  

  }

}
