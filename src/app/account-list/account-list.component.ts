import {Component, OnInit} from '@angular/core';
import { AccountsService } from '../alamiya.service.service';
import { Account } from '../account';
import { Location } from '@angular/common';
import { AccountFormComponent } from '../add-new-account-dialog/add-new-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-account-list',
  styleUrls: ['account-list.component.css'],
  templateUrl: 'account-list.component.html',
})

export class AccountListComponent implements OnInit{
  accounts: Account[];
  displayedColumns: string[] = ['select', 'id', 'server', 'username', 'status', 'actions'];

  constructor (
    private accountsService: AccountsService,
    private location: Location,
    public dialog: MatDialog
   
  ){}
  
  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts();
  }

  selectAllAccounts(event: MatCheckboxChange) {
    this.accounts.forEach(account => {
      account.selected = event.checked;
    });
  }
  

  editAccountDialog(account: Account) {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      data: { id: account.id, username: account.username, password: account.password, server: account.server, status: false, select: false},
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountsService.updateAccount(result);
      }
    });
  }

  addAccountDialog(): void {
    if (this.accounts.length !== 0) {
      const newId = this.accounts[this.accounts.length - 1].id + 1;
      const dialogRef = this.dialog.open(AccountFormComponent, {
      data: {id:newId},
      });

      dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountsService.addAccount(result);
        this.accountsService.saveChanges();
        window.location.reload();
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
        this.accountsService.addAccount(result);
        this.accountsService.saveChanges();
        window.location.reload();
      }
      });
    }
    
  }
  
  toggleStatus(account: Account){
    this.accountsService.toggleAccountStatus(account);
  }

  hasSelectedAccounts(): boolean {
    return this.accounts.some(account => account.selected); 
  }

  selectedAccountsStatus(): boolean {
    const selectedAccounts = this.accounts.filter(account => account.selected);
    const selectedAccountsStatus = selectedAccounts[0].status;
  
    return selectedAccountsStatus
  }
  
  selectedAccountsStatusDifference(): boolean {
    const connectedSelectedAccounts = this.accounts.some(account => account.status && account.selected);
    const disconnectedSelectedAccounts = this.accounts.some(account => !account.status && account.selected);
  
    return (connectedSelectedAccounts !== disconnectedSelectedAccounts)
  }
  
  deleteAccount(account: Account){
    this.accountsService.deleteAccount(account);
  }

  deleteSelectedAccounts(): void {
    const selectedAccounts = this.accounts.filter(account => account.selected);
    selectedAccounts.forEach(account => {
      const index = this.accounts.findIndex(acc => acc === account);
      if (index !== -1) {
        this.accounts.splice(index, 1);
      }
    });
  
    this.accountsService.saveChanges();
    this.accounts = this.accountsService.getAccounts();
    window.location.reload();
  }

  toggleSelectedAccountsStatus(): void {
    const selectedAccounts = this.accounts.filter(account => account.selected);
    selectedAccounts.forEach(account => {
      account.status = !account.status;
    });
  
    this.accountsService.saveChanges();
    this.accounts = this.accountsService.getAccounts();
    window.location.reload();
  }
  
  
  goBack(){
    this.location.back();
  }
}

