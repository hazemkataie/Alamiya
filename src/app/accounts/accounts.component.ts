import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Account } from '../account';
import { AccountsService } from '../alamiya.service.service';

import {MatDialog } from '@angular/material/dialog';
import { AccountFormComponent } from '../add-new-account-dialog/add-new-account-dialog.component';



@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})

export class AccountsComponent {
  accounts: Account[]; // Array to store accounts
  liveAccount: number = 0; // Variable to store the count of live accounts
  server: number;

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
    if (this.accounts.length !== 0) {
      const newId = this.accounts[this.accounts.length - 1].id + 1;
      const dialogRef = this.dialog.open(AccountFormComponent, {
      data: {id:newId},
      });

      dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addAccount(result);
      }
      });
    }

    else {
      const newId = 1;
      const dialogRef = this.dialog.open(AccountFormComponent, {
      data: {id:newId},
      });

      dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.addAccount(result);
      }
      });
    }
    
  }

  toggleStatus(account: Account) {
    if (account.username.trim() !== '' && account.password !== null) {
      // Toggle the status of the account
      account.status = !account.status;
      this.accountsService.saveChanges(); // Save the changes to the accounts
    }
  }

  addAccount(account:Account) {
    this.accountsService.addAccount(account);
  }

  deleteAccount(account: Account): void {
    this.accountsService.deleteAccount(account);
  }

  goBack(): void {
    this.location.back(); // Go back to the previous location
  }
}
