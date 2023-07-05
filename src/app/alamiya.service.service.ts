import { Injectable } from '@angular/core';

@Injectable()

export class AccountsService {
  private accounts: any[] = [
    { id: 1, server: null, username: '', password: null, status: false },
  ];

  saveChanges(): void {
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

  getAccounts(): any[] {
    return this.accounts;
  }

  getActiveAccountsCount(): number {
    return this.accounts.filter(account => account.status).length;
  }
}
