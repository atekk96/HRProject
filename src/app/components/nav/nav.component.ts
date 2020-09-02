import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  selectedLanguage: string;

  constructor(private navService: NavService) {
    this.selectedLanguage = this.navService.currentLanguage
    this.navService.sendLanguage(this.selectedLanguage);
   }

  ngOnInit() {
  }

  changeLanguage() {
    this.navService.sendLanguage(this.selectedLanguage);
  }

}
