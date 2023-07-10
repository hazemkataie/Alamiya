import {Component, OnInit} from '@angular/core';
import { AccountsService } from '../alamiya.service.service';
import { Account } from '../account';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-list',
  styleUrls: ['account-list.component.css'],
  templateUrl: 'account-list.component.html',
})

export class AccountListComponent implements OnInit{
  accounts: Account[];
  displayedColumns: string[] = ['id', 'server', 'username', 'password', 'status'];

  constructor (
    private accountsService: AccountsService,
    private location: Location,
  ){}
  
  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts();
  }

  goBack(){
    this.location.back();
  }
}

