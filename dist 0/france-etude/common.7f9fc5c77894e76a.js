"use strict";(self.webpackChunkFrance_Etude=self.webpackChunkFrance_Etude||[]).push([[592],{1336:(m,d,n)=>{n.d(d,{H:()=>u});var s=n(4946),a=n(459);let u=(()=>{class i{constructor(e){this.cookieService=e}setCookie(e,c){const o=new Date;o.setTime(o.getTime()+24*c*60*60*1e3);const t="expires="+o.toUTCString();document.cookie="email="+e.email+";"+t+";path=/",document.cookie="id_utilisateur="+e.id_utilisateur+";"+t+";path=/",document.cookie="pseudo="+e.pseudo+";"+t+";path=/",document.cookie="status="+e.status+";"+t+";path=/",document.cookie="connexion=true;"+t+";path=/",document.cookie="creation="+e.date_creation+";"+t+";path=/"}setConnexion(e,c){const o=new Date;o.setTime(o.getTime()+24*e*60*60*1e3);const t="expires="+o.toUTCString();document.cookie="connexion="+c+";"+t+";path=/"}getCookie(e){const o=decodeURIComponent(document.cookie).split(";");for(let t of o){const[k,r]=t.split("=");if(k.trim()===e)return r}return""}deleteCookie(e){document.cookie=e+"=; Max-Age=-99999999;"}delete(){const e=new Date(2015,0,20);console.log(e),document.cookie="email=;"+e+";path=/",document.cookie="id_utilisateur=;"+e+";path=/",document.cookie="pseudo=;"+e+";path=/",document.cookie="status=;"+e+";path=/",document.cookie="connexion=;"+e+";path=/",document.cookie="creation=;"+e+";path=/"}deleteAll(){const e=document.cookie.split(";");for(const c of e){const o=c.split("=")[0];document.cookie=`${o}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`}}deleteAllCookies(){const c=decodeURIComponent(document.cookie).split(";");for(let o of c){const[t]=o.split("=");this.deleteCookie(t.trim())}}static#e=this.\u0275fac=function(c){return new(c||i)(s.LFG(a.N))};static#o=this.\u0275prov=s.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})()}}]);