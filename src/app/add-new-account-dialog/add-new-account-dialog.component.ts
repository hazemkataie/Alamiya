import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {NgIf} from '@angular/common';

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
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, NgIf],
})


export class AccountFormComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<AccountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}


  ngOnInit(): void {
  }

  onNoClick(): void { 
    this.dialogRef.close();
  }
}