import { Injectable } from '@angular/core';

@Injectable()

export class AccountsService {
  // Private property to store the accounts
  private accounts: any[];

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
}
