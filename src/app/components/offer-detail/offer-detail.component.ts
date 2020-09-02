import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { OfferService } from 'src/app/services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import { Offerdetail } from 'src/app/models/offerdetail';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  reference: string;
  od: Offerdetail;

  constructor(private os: OfferService, private ar: ActivatedRoute, private ns: NavService, private route: ActivatedRoute) {
    this.ns.language.subscribe(result => {
      this.getOfferDetail();
    })
    this.ar.params.subscribe(result => {
      this.reference = result.ref_id.replace(/-/g, "/")
    })

   }

  ngOnInit() {
    let expireDate = new Date(this.route.snapshot.data['data'].job.expiryDate)
    let publishDate = new Date(this.route.snapshot.data['data'].job.publishDate)
    let todayDate = new Date();
    let Difference_In_Time = expireDate.getTime() - todayDate.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    this.od = new Offerdetail(this.route.snapshot.data['data'].job.applicationLink, this.route.snapshot.data['data'].job.clause,
    this.route.snapshot.data['data'].job.company, expireDate, this.route.snapshot.data['data'].job.location, 
    this.route.snapshot.data['data'].job.opportunities, this.route.snapshot.data['data'].job.positionDescription, publishDate,
    this.route.snapshot.data['data'].job.requirements, this.route.snapshot.data['data'].job.title, Math.floor(Difference_In_Days),
    this.route.snapshot.data['data'].job.experience)
  }

  getOfferDetail() {
    this.os.getOfferDetailData(this.ns.currentLanguage, this.reference).subscribe(res => {
      let expireDate = new Date(res.job.expiryDate)
      let publishDate = new Date(res.job.publishDate)
      let todayDate = new Date();
      let Difference_In_Time = expireDate.getTime() - todayDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      this.od = new Offerdetail(res.job.applicationLink, res.job.clause,
        res.job.company, expireDate, res.job.location, 
        res.job.opportunities, res.job.positionDescription, publishDate,
        res.job.requirements, res.job.title, Math.floor(Difference_In_Days),
        res.job.experience)
    })
  }


}
