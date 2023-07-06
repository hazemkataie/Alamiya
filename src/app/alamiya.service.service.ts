import { Injectable } from '@angular/core';

@Injectable()

export class AccountsService {
  private accounts: any[];

  constructor() {
    this.loadAccounts();
  }

  private loadAccounts(): void {
    const savedAccounts = localStorage.getItem('accounts');
    if (savedAccounts) {
      this.accounts = JSON.parse(savedAccounts);
    } else {
      this.accounts = [
        { id: 1, server: null, username: '', password: null, status: false }
      ];
      this.saveChanges();
    }
  }

  saveChanges(): void {
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

  getAccounts(): any[] {
    return this.accounts;
  }

  getActiveAccountsCount(): number {
    return this.accounts.filter(account => account.status).length;
  }

  getActiveAccountsId(): number[] {
    return this.accounts.filter(account => account.status).map(account => account.id);
  } 
  
  getActiveAccounts(): [] {
    return this.accounts.find(account => account.status);
  }
}
