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
  accounts: Account[]; // Array to store accounts
  liveAccount: number = 0; // Variable to store the count of live accounts

  constructor(
    private location: Location,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts(); // Get the accounts from the service
    this.liveAccount = this.accounts.length; // Set the count of live accounts
  }

  toggleStatus(account: Account) {
    if (account.username.trim() !== '' && account.password !== null) {
      // Toggle the status of the account
      account.status = !account.status;
      this.accountsService.saveChanges(); // Save the changes to the accounts
    }
  }

  addAccount() {
    const newId = this.accounts.length + 1; // Generate a new ID for the account
    this.accounts.push({ id: newId, server: 4200, username: '', password: null, status: false }); // Add a new account to the array
    this.liveAccount = this.accounts.length; // Update the count of live accounts
    this.accountsService.saveChanges(); // Save the changes to the accounts
  }

  deleteAccount(account: Account): void {
    const index = this.accounts.findIndex(acc => acc === account); // Find the index of the account in the array
    if (index !== -1) {
      this.accounts.splice(index, 1); // Remove the account from the array
    }
  }

  goBack(): void {
    this.location.back(); // Go back to the previous location
  }
}
