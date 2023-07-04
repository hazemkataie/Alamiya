import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ACCOUNTS } from '../accounts';
import { Account } from '../account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent {
  server: number = 0;
  username: string = '';
  password: number = 0;
  buttonColor: string = 'red';

  constructor(
    private location: Location
  ){}

  check(){
    if(this.username.trim() != '' && this.password != 0 && this.server != 0){
      this.buttonColor = 'green';
    }
    else {
      this.buttonColor = 'red';
    }
  }
  
  accounts: any[] = [
    { id: 1, server: '', username: '', password: '' }
  ];

  addAccount() {
    const newId = this.accounts.length + 1;
    this.accounts.push({ id: newId, server: '', username: '', password: '' });
  }

  goBack(): void {
    this.location.back();
  }
  
}