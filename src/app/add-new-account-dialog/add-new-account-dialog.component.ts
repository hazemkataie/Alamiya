import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Account } from '../account';

export interface DialogData {
  id: number;
  username: string;
  password: number;
  server: number;
  status: boolean;
}

@Component({
  selector: 'app-account-form',
  templateUrl: './add-new-account-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})


export class AccountFormComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<AccountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {

    // this.account = {
    //   id: this.data.id,
    //   username: this.username,
    //   password: this.password,
    //   server: this.server,
    //   status: this.status,
    // };
  }

  onNoClick(): void { 
    this.dialogRef.close();
  }
}