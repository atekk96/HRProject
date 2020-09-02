import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Category } from '../models/category';
import { Observable, Subject } from 'rxjs';
import { Offer } from '../models/offer';
import { NavService } from './nav.service';
import { environment } from '../../environments/environment'



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-Api-Key': environment.API_KEY
  })
};


@Injectable({
  providedIn: 'root'
})





export class OfferService {

  private url: string;
  test: Observable<any>;
  private subjectTest = new Subject<any>();


  constructor(private http: HttpClient, private ns: NavService) {
    this.url = 'https://api.lot.com/hr/v3/'; 
  }

  public getCategories(language: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'categories/' + this.ns.currentLanguage, httpOptions);
  }

  public getOffers(language: string): Observable<any> {
    return this.http.get<Offer[]>(this.url + 'offers/list/' + this.ns.currentLanguage, httpOptions);
  }

  public getOfferDetailData(language: string, reference: string): Observable<any> {
    const body = {"ref_id": reference}
    return this.http.post<any>('http://localhost:4200/api', body, httpOptions);
  }

}
