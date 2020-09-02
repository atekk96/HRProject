import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { Subscription, pipe, Subject, Observable } from 'rxjs';
import { NavService } from 'src/app/services/nav.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-Api-Key': 'zEiAS4E5pE3mFnaqIKn3s6kCxsgqHCKH9VB97I0f' 
  })
};

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  @ViewChild('a', {static: false}) a: any;
  @ViewChild('b', {static: false}) b: any;
  private url: string;
  category: string;
  offers: Offer[];
  offerSubscription: Subscription;
  p: Number = 1;
  count: Number = 2;
  subscriptions = new Set<Subscription>();
  config: any;
  collection = { count: 3, data: this.offers };
  searchTag: boolean = false;
  searchResults: Offer[];

  constructor(private os: OfferService, private ar: ActivatedRoute, private router: Router, private ns: NavService, private http: HttpClient) {
    this.offers = [];
    this.config =  {
      itemsPerPage: 1,
      currentPage: 1,
      totalItems: this.collection.count
    };

   }

  ngOnInit() {
    this.ar.params.subscribe(result => {
      this.category = result.category
    })
    this.ns.language.subscribe(result => {
      this.getOffers();
    })
    this.getOffers();
  }


  ngOnDestroy(): void {
    for(let entry of this.subscriptions) {
      entry.unsubscribe();
    }
    
  }

  search(event: any) {  // NAD TYM TERAZ PRACUJE
    this.searchResults = []
    if(this.a.nativeElement.value != '' && this.b.nativeElement.value != '') {
      this.searchTag = true;
      this.offers.forEach(res => {
        if(res.location.toLowerCase().includes(this.a.nativeElement.value.toLowerCase()) && res.region.toLowerCase().includes(this.b.nativeElement.value.toLowerCase())) {
          this.searchResults.push(res)
        }
      })
    } else if(this.a.nativeElement.value != '') {
      this.searchTag = true;
      this.offers.forEach(res => {
        if(res.location.toLowerCase().includes(this.a.nativeElement.value.toLowerCase())) {
          this.searchResults.push(res)
        }
      })
    } else if (this.b.nativeElement.value != '') {
      this.searchTag = true;
      this.offers.forEach(res => {
        if(res.region.toLowerCase().includes(this.b.nativeElement.value.toLowerCase())) {
          this.searchResults.push(res)
        }
      })
    } else {
      this.searchTag = false;
      this.searchResults = []
    }
 
  }


  test(event: Offer) {
    event.reference = event.reference.replace(/\//g, "-");
    this.router.navigate(['/detail/' + event.reference]);
  }

pageChanged(event){
  this.config.currentPage = event;
}

public getOffers() {
  this.offerSubscription = this.os.getOffers(this.ns.currentLanguage).subscribe(result => {
    if(this.offers.length > 0) {
      this.offers = []
    }
    result.jobs.forEach(results => {
      results.category.forEach(cat => {
        if(cat == this.category) {
          this.offers.push(results)
        }
      })
      this.searchResults = this.offers
    })
  })
  this.subscriptions.add(this.offerSubscription)
}


}
