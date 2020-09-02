import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';
import { NavService } from 'src/app/services/nav.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  categories: Category[];
  categorySubscription: Subscription;
  selectedLanguage: string;
  ifLoaded: Promise<boolean>;
  subscriptions = new Set<Subscription>();

  constructor(private os: OfferService, private ns: NavService, private route: ActivatedRoute) {
    this.selectedLanguage = ns.currentLanguage
   }

  ngOnInit() {
    this.categories = this.route.snapshot.data['category']
    this.ns.language.subscribe(result => {
      this.getCategories();
    })
  }

  ngOnDestroy(): void {
    for(let entry of this.subscriptions) {
      entry.unsubscribe()
    }
    
  }


  public getCategories() {
    this.categorySubscription = this.os.getCategories(this.ns.currentLanguage).subscribe(result => {
      this.categories = result;
      this.ifLoaded = Promise.resolve(true);
    })
    this.subscriptions.add(this.categorySubscription)
  }


}
