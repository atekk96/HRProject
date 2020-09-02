import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OfferService } from '../services/offer.service';
import { NavService } from '../services/nav.service';

@Injectable()
export class Offerresolve {
    
    constructor(private os: OfferService, private ns: NavService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.os.getOffers(this.ns.currentLanguage)
    }

}
