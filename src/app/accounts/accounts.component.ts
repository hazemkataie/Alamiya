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


  accounts: Account[] = [
  { id: 1, server: 4200, username: '', password: null, status: false }
  ];
  
  liveAccount: number = 0;

  constructor(
    private location: Location,
    private accountsService: AccountsService
    ) {}

    ngOnInit(): void {
      const accounts = this.accountsService.getAccounts();
      this.liveAccount = accounts.length;
      this.accountsService.saveChanges();
    }

  toggleStatus(account: Account) {
    if(account.username.trim() === String(account.password)){
      account.status = !account.status;
      this.accountsService.saveChanges();
    }
    
  }

  addAccount() {
    const newId = this.accounts.length+1;
    this.accounts.push({ id: newId, server: 4200 , username: '', password: null , status: false });
    this.accountsService.saveChanges();
  }

  goBack(): void {
    this.location.back();
    this.accountsService.saveChanges();
  }
}
