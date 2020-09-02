import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './services/httperrorinterceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { OfferService } from './services/offer.service';
import { OffersComponent } from './components/offers/offers.component';
import { OfferDetailComponent } from './components/offer-detail/offer-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { Categoryresolve } from './resolvers/categoryresolve';
import { Offerresolve } from './resolvers/offerresolve';
import { Offerdetailresolver } from './resolvers/offerdetailresolver';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OffersComponent,
    OfferDetailComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [OfferService, Categoryresolve, Offerresolve, Offerdetailresolver, {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
