import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersComponent } from './components/offers/offers.component';
import { MainComponent } from './components/main/main.component';
import { OfferService } from './services/offer.service';
import { OfferDetailComponent } from './components/offer-detail/offer-detail.component';
import { Categoryresolve } from './resolvers/categoryresolve';
import { Offerresolve } from './resolvers/offerresolve';
import { Offerdetailresolver } from './resolvers/offerdetailresolver';


const routes: Routes = [
  { path: '', component: MainComponent, resolve: {category: Categoryresolve} },
  { path: 'category/:category', component: OffersComponent, resolve: {data: Offerresolve}},
  { path: 'detail/:ref_id', component: OfferDetailComponent, resolve: {data: Offerdetailresolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [OfferService]
})
export class AppRoutingModule { }
