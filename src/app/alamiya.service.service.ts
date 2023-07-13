import { Injectable } from '@angular/core';
import { Account } from './account';

@Injectable()

export class AccountsService {
  // Private property to store the accounts
  private accounts: any[];
  liveAccount: number = 0;

  constructor() {
    // Load the accounts when the service is instantiated
    this.loadAccounts();
  }

  // Load accounts from local storage or initialize with default values
  private loadAccounts(): void {
    const savedAccounts = localStorage.getItem('accounts');
    if (savedAccounts) {
      // Parse the saved accounts from JSON
      this.accounts = JSON.parse(savedAccounts);
    } else {
      // If no saved accounts, initialize with default values
      this.accounts = [
        { id: 1, server: null, username: '', password: null, status: false }
      ];
      // Save the changes
      this.saveChanges();
    }
  }

  // Save the changes to the accounts in local storage
  saveChanges(): void {
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }


  // Get all accounts
  getAccounts(): any[] {
    return this.accounts;
  }

  // Get the count of active accounts
  getActiveAccountsCount(): number {
    return this.accounts.filter(account => account.status).length;
  }

  // Get the IDs of active accounts
  getActiveAccountsId(): number[] {
    return this.accounts.filter(account => account.status).map(account => account.id);
  } 
  
  // Get the active accounts
  getActiveAccounts(): any[] {
    return this.accounts.filter(account => account.status);
  }

  addAccount(account:Account) {
    
    if (this.accounts.length == 0) {
      this.accounts.push({ id: account.id, server: 4200, username: account.username, password: account.password, status: false }); // Add a new account to the array
      this.liveAccount = this.accounts.length; // Update the count of live accounts
      this.saveChanges(); // Save the changes to the accounts
    }
    else {
      const newId = this.accounts[this.accounts.length - 1].id + 1;
      this.accounts.push({ id: account.id, server: 4200, username: account.username, password: account.password, status: false }); // Add a new account to the array
      this.liveAccount = this.accounts.length; // Update the count of live accounts
      this.saveChanges(); // Save the changes to the accounts
    }
  }

  deleteAccount(account: Account): void {
    const index = this.accounts.findIndex(acc => acc === account);
    if (index !== -1) {
      this.accounts.splice(index, 1);
      this.saveChanges();
      this.accounts = this.getAccounts(); // accounts dizisini güncelle
      window.location.reload();   
    }
  }

  updateAccount(account: Account) {
    const index = this.accounts.findIndex(acc => acc.id === account.id);
    if (index !== -1) {
      this.accounts[index] = account;
      this.saveChanges();
      this.accounts = this.getAccounts();
      window.location.reload();
    }
  }
}
