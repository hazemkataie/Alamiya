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
  liveAccounts: Account[];
  liveAccountsCount: number= null;
  liveAccountsId: number[];
  accounts = []= [];

  selectedAccount: string;
  selectedAccountUsername: string;

  ngOnInit(): void {
    
    // Get the count of active accounts
    this.liveAccountsCount = this.accountsService.getActiveAccountsCount();
  
    // Get the IDs of active accounts
    this.liveAccountsId = this.accountsService.getActiveAccountsId();
  
    // Get the active accounts
    this.liveAccounts = this.accountsService.getActiveAccounts();
  
    // Save changes to the accounts
    this.accountsService.saveChanges();
  }
  
  onSelectAccount(value: string): void {
    console.log('account changed');
    
    // Set the selected account
    this.selectedAccount = value;

    // Define the selectedAccountUsername to account
    const account = this.liveAccounts.find(acc => acc.id === Number.parseInt(this.selectedAccount));
    
    this.selectedAccountUsername = account ? account.username : '';
  }
  
  gold() {
    // Set the goldButton to true and reset other buttons
    this.goldButton = 'true';
    this.dolarButton = '';
    this.euroButton = '';
  }
  
  dolar() {
    // Set the dolarButton to true and reset other buttons
    this.goldButton = '';
    this.dolarButton = 'true';
    this.euroButton = '';
  }
  
  euro() {
    // Set the euroButton to true and reset other buttons
    this.goldButton = '';
    this.dolarButton = '';
    this.euroButton = 'true';
  }
  
  satinAl() {
    if (this.goldButton === 'true' && this.gram != null) {
      // Perform gold purchases
      this.message = 'Gold purchases.';
      this.messageColor = 'Green';
    } else if (this.dolarButton === 'true' && this.gram != null) {
      // Perform dolar purchases
      this.message = 'Dolar purchases.';
      this.messageColor = 'Green';
    } else if (this.euroButton === 'true' && this.gram != null) {
      // Perform euro purchases
      this.message = 'Euro purchases.';
      this.messageColor = 'Green';
    } else {
      // Display an alert if the value is not entered
      alert("Please enter the value!");
    }
  }
  
  sat() {
    if (this.goldButton === 'true' && this.gram != null) {
      // Perform gold sales transaction
      this.message = 'Gold sales transaction.';
      this.messageColor = 'Red';
    } else if (this.dolarButton === 'true' && this.gram != null) {
      // Perform dolar sales transaction
      this.message = 'Dolar sales transaction.';
      this.messageColor = 'Red';
    } else if (this.euroButton === 'true' && this.gram != null) {
      // Perform euro sales transaction
      this.message = 'Euro sales transaction.';
      this.messageColor = 'Red';
    } else {
      // Display an alert if the value is not entered
      alert("Please enter the value!");
    }
  }
}  