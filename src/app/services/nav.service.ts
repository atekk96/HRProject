import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  language: Observable<string>;
  currentLanguage: string = '';
  private subjectLanguage = new Subject<string>();

  constructor() {
    if(localStorage.getItem('language') == null) {
      localStorage.setItem('language', 'pl');
    } else {
      this.currentLanguage = localStorage.getItem('language');
    }
    this.language = this.subjectLanguage.asObservable();
   }

   sendLanguage(lang: string) {
     this.subjectLanguage.next(lang);
     localStorage.setItem('language', lang);
     this.currentLanguage = localStorage.getItem('language');
   }

}
