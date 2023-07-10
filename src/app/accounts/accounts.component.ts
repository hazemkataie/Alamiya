import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Account } from '../account';
import { AccountsService } from '../alamiya.service.service';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../add-new-account-dialog/add-new-account-dialog.component';



@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})

export class AccountsComponent {
  accounts: Account[]; // Array to store accounts
  liveAccount: number = 0; // Variable to store the count of live accounts
  server: number = 4200;

  constructor(
    private location: Location,
    private accountsService: AccountsService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts(); // Get the accounts from the service
    this.liveAccount = this.accounts.length; // Set the count of live accounts
  }

  openDialog(): void {
    const newId = this.accounts[this.accounts.length - 1].id + 1;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {id:newId},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.addAccount(result);
      }
    });
  }

  toggleStatus(account: Account) {
    if (account.username.trim() !== '' && account.password !== null) {
      // Toggle the status of the account
      account.status = !account.status;
      this.accountsService.saveChanges(); // Save the changes to the accounts
    }
  }

  addAccount(account:Account) {
    
    if (this.accounts.length == 0) {
      this.accounts.push({ id: account.id, server: 4200, username: account.username, password: account.password, status: false }); // Add a new account to the array
      this.liveAccount = this.accounts.length; // Update the count of live accounts
      this.accountsService.saveChanges(); // Save the changes to the accounts
    }
    else {
      const newId = this.accounts[this.accounts.length - 1].id + 1;
      this.accounts.push({ id: account.id, server: 4200, username: account.username, password: account.password, status: false }); // Add a new account to the array
      this.liveAccount = this.accounts.length; // Update the count of live accounts
      this.accountsService.saveChanges(); // Save the changes to the accounts
    }
  }

  deleteAccount(account: Account): void {
    const index = this.accounts.findIndex(acc => acc === account); // Find the index of the account in the array
    if (index !== -1) {
      this.accounts.splice(index, 1); // Remove the account from the array
      this.accountsService.saveChanges();
    }
  }

  goBack(): void {
    this.location.back(); // Go back to the previous location
  }
}
