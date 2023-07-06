import { Component } from '@angular/core';
import { AccountsService } from '../alamiya.service.service';
import { Account } from '../account';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private accountsService: AccountsService) {}

  gram: number = null;
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
  liveAccounts: [];
  liveAccountsCount: number= null;
  liveAccountsId: number[];
  accounts = [];

  selectedAccount: number;
  selectedAccountUsername: string;

  ngOnInit(): void {
    const accounts = this.accountsService.getAccounts();
    this.liveAccountsCount = this.accountsService.getActiveAccountsCount();
    this.liveAccountsId = this.accountsService.getActiveAccountsId();
    this.liveAccounts = this.accountsService.getActiveAccounts();
    this.accountsService.saveChanges();
  }

  onSelectAccount(value:number): void {
      this.selectedAccount = value;
      // this.getSelectedAccountUsername();
  }
    
  getSelectedAccountUsername(): void {
    this.accounts = this.liveAccounts;
    this.selectedAccountUsername = this.accounts.find(account => account.id === this.selectedAccount).map(account => account.username);
  }

  

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

    if (this.goldButton === 'true' && this.gram != null) {
      this.message = 'Gold purchases.';
      this.messageColor = 'Green';
      this.getSelectedAccountUsername();
    }
    else if (this.dolarButton === 'true' && this.gram != null) {
      this.message = 'Dolar purchases.';
      this.messageColor = 'Green';
      this.getSelectedAccountUsername();
    } 
    else if (this.euroButton === 'true' && this.gram != null) {
      this.message = 'Euro purchases.';  
      this.messageColor = 'Green';
      this.getSelectedAccountUsername();
    }
    else {
      alert("Please enter the value!");
    }
    
  }

  sat() {
    if (this.goldButton === 'true' && this.gram != null) {
      this.message = 'Gold sales transaction.';
      this.messageColor = 'Red';
      this.getSelectedAccountUsername();
    }
    else if (this.dolarButton === 'true' && this.gram != null) {
      this.message = 'Dolar sales transaction.';
      this.messageColor = 'Red';
      this.getSelectedAccountUsername();
    } 
    else if (this.euroButton === 'true' && this.gram != null){
      this.message = 'Euro sales transaction.';  
      this.messageColor = 'Red';
      this.getSelectedAccountUsername();
    }
    else {
      alert("Please enter the value!");
    }
  } 
}