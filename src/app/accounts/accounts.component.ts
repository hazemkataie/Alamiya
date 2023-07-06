import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Account } from '../account';
import { AccountsService } from '../alamiya.service.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  accounts: Account[];
  liveAccount: number = 0;

  constructor(
    private location: Location,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts();
    this.liveAccount = this.accounts.length;
  }

  toggleStatus(account: Account) {
    if (account.username.trim() !== '' && account.password !== null) {
      account.status = !account.status;
      this.accountsService.saveChanges();
    }
  }

  addAccount() {
    const newId = this.accounts.length + 1;
    this.accounts.push({ id: newId, server: 4200, username: '', password: null, status: false });
    this.liveAccount = this.accounts.length;
    this.accountsService.saveChanges();
  }

  deleteAccount(account: Account): void {
    const index = this.accounts.findIndex(acc => acc === account);
    if (index !== -1) {
      this.accounts.splice(index, 1);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
