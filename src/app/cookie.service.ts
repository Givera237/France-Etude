import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService
{
   constructor() { }

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


}
