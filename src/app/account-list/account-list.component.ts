import {Component, OnInit} from '@angular/core';
import { AccountsService } from '../alamiya.service.service';
import { Account } from '../account';
import { Location } from '@angular/common';
import { AccountFormComponent } from '../add-new-account-dialog/add-new-account-dialog.component';
import {MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-list',
  styleUrls: ['account-list.component.css'],
  templateUrl: 'account-list.component.html',
})

export class AccountListComponent implements OnInit{
  accounts: Account[];
  displayedColumns: string[] = ['id', 'server', 'username', 'password', 'status', 'actions'];

  constructor (
    private accountsService: AccountsService,
    private location: Location,
    public dialog: MatDialog
   
  ){}
  
  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts();
  }

  openDialog(element: { id: any; }) {
    const dialogRef = this.dialog.open(AccountFormComponent,{
      data: {id:element.id},
      });
      dialogRef.afterClosed();
  }

  deleteAccount(account: Account){
    this.accountsService.deleteAccount(account);
  }
  
  goBack(){
    this.location.back();
  }
}

