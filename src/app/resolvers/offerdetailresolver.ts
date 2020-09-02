import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OfferService } from '../services/offer.service';
import { NavService } from '../services/nav.service';
import { Observable } from 'rxjs';

@Injectable()
export class Offerdetailresolver {

    constructor(private os: OfferService, private ns: NavService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.os.getOfferDetailData(this.ns.currentLanguage, route.params['ref_id'].replace(/-/g, "/"))
    }

}
