import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServices
{
   constructor(private readonly cookieService: CookieService) { }

   setCookie( objet : any, expirationDays: number) 
   {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
   // document.cookie = name + "=" + value + ";" + expires + ";path=/";
    document.cookie = "email=" + objet.email + ";" + expires + ";path=/";
    document.cookie = "id_utilisateur=" + objet.id_utilisateur + ";" + expires + ";path=/";
    document.cookie = "pseudo=" + objet.pseudo + ";" + expires + ";path=/";
    document.cookie = "status=" + objet.status + ";" + expires + ";path=/";
    document.cookie = "connexion=" + true + ";" + expires + ";path=/";
    document.cookie = "creation=" + objet.date_creation + ";" + expires + ";path=/";
  }

  setConnexion( expirationDays: number, valeur : string)
  {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();

    document.cookie = "connexion=" + valeur + ";"  + expires + ";path=/";
  }

  getCookie(name: string): string 
  {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let cookie of cookies) 
    {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) 
      {
        return cookieValue;
      }
    }
    return "";
  }

  deleteCookie(name: string) 
  {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  delete()
  {
    const maDate = new Date(2015, 0, 20); // 20 janvier 2015
    console.log(maDate)

    document.cookie = "email=" +'' + ";" + maDate + ";path=/";
    document.cookie = "id_utilisateur=" +'' + ";" + maDate + ";path=/";
    document.cookie = "pseudo=" + '' + ";" + maDate + ";path=/";
    document.cookie = "status=" + '' + ";" + maDate + ";path=/";
    document.cookie = "connexion=" + '' + ";" + maDate + ";path=/";
    document.cookie = "creation=" + '' + ";" + maDate + ";path=/";

  }

  deleteAll()
  {
// Supprimer tous les cookies
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) 
  {
    const cookieName = cookie.split('=')[0];
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
  }

  deleteAllCookies() {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let cookie of cookies) 
    {
      const [cookieName] = cookie.split('=');
      this.deleteCookie(cookieName.trim());
    }
  }



}
