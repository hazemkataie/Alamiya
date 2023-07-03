import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  gram: number = 1;
  altinGramAlisFiyati: number = 1.609;
  altinGramSatisFiyati: number = 1.607;
  dolarAlisFiyati: number = 23.156;
  dolarSatisFiyati: number = 21.875;
  euroAlisFiyati: number = 24.567;
  euroSatisFiyati: number = 23.115;
  message : string = '';
  messageColor: string = '';
  goldButton: string = '';
  dolarButton: string = '';
  euroButton: string = '';

  gold(){
    this.goldButton = 'true';
    this.dolarButton = '';
    this.euroButton = '';
  }

  dolar(){
    this.goldButton = '';
    this.dolarButton = 'true';
    this.euroButton = '';
  }

  euro(){
    this.goldButton = '';
    this.dolarButton = '';
    this.euroButton = 'true';
  }

  satinAl() {

    if (this.goldButton === 'true') {
      this.message = 'Altin satin alma islemi';
    }
    else if (this.dolarButton === 'true') {
      this.message = 'Dolar satin alma islemi';
    } 
    else {
      this.message = 'Euro satin alma islemi';  
    }
    this.messageColor = 'Green';
  }

  sat() {
    if (this.goldButton === 'true') {
      this.message = 'Altin satma alma islemi';
    }
    else if (this.dolarButton === 'true') {
      this.message = 'Dolar satma alma islemi';
    } 
    else {
      this.message = 'Euro satma alma islemi';  
    }
    this.messageColor = 'Red';
  }

  
}
