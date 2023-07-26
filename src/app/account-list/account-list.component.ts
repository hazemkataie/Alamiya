import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../alamiya.service.service';
import { Account } from '../account';
import { Location } from '@angular/common';
import { AccountFormComponent } from '../add-new-account-dialog/add-new-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { forkJoin } from 'rxjs';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-account-list',
  styleUrls: ['account-list.component.css'],
  templateUrl: 'account-list.component.html',
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  displayedColumns: string[] = ['select', 'id', 'server', 'username', 'status', 'actions'];

  constructor(
    private accountsService: AccountsService,
    private location: Location,
    public dialog: MatDialog,
    public loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loadingService.showLoading();
    this.accountsService.getAccountsFromApi().subscribe(
      (accounts) => {
        this.loadingService.hideLoading();
        this.accounts = accounts;
      },
      (error) => {
        this.loadingService.hideLoading();
        console.error('Hesaplar yüklenirken bir hata oluştu:', error);
      }
    );
  }

  selectAllAccounts(event: MatCheckboxChange) {
    this.accounts.forEach((account) => {
      account.selected = event.checked;
    });
  }

  editAccountDialog(account: Account) {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      data: { id: account.id, username: account.username, password: account.password, server: account.server, status: false, select: false},
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountsService.updateAccount(result).subscribe(() => this.loadAccounts());
      }
    });
  }

  addAccountDialog(): void {
    if (this.accounts.length !== 0) {
      const newId = this.accounts[this.accounts.length - 1].id + 1;
      const dialogRef = this.dialog.open(AccountFormComponent, {
        data: { id: newId },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.accountsService.addAccount(result).subscribe(() => this.loadAccounts());
        }
      });
    } 
    else {
      const newId = 1;
      const dialogRef = this.dialog.open(AccountFormComponent, {
        data: { id: newId },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.accountsService.addAccount(result).subscribe(() => this.loadAccounts());
        }
      });
    }
  }

  toggleStatus(account: Account) {
    this.accountsService.toggleAccountStatus(account).subscribe(() => {
      this.loadAccounts();
    });
  }

  hasSelectedAccounts(): boolean {
    return this.accounts && this.accounts.some((account) => account.selected);
  }

  selectedAccountsStatus(): boolean {
    const selectedAccounts = this.accounts.filter((account) => account.selected);
    const selectedAccountsStatus = selectedAccounts[0]?.status || false;

    return selectedAccountsStatus;
  }

  selectedAccountsStatusDifference(): boolean {
    const connectedSelectedAccounts = this.accounts.some(
      (account) => account.status && account.selected
    );
    const disconnectedSelectedAccounts = this.accounts.some(
      (account) => !account.status && account.selected
    );

    return connectedSelectedAccounts !== disconnectedSelectedAccounts;
  }

  deleteAccount(account: Account) {
    this.accountsService.deleteAccount(account).subscribe(() => {
      this.loadAccounts();
    });
  }

  deleteSelectedAccounts(): void {
    const selectedAccounts = this.accounts.filter((account) => account.selected);
    const deletionObservables = selectedAccounts.map((account) => this.accountsService.deleteAccount(account));

    // Merge all the deletion observables into a single observable
    forkJoin(deletionObservables).subscribe(
      () => {
        // Filter out the deleted accounts from the current accounts list
        this.accounts = this.accounts.filter((account) => !account.selected);
        // Save the changes to the backend
        this.accountsService.saveChanges().subscribe(() => {
          console.log('Seçili hesaplar başarıyla silindi ve değişiklikler backend\'e kaydedildi.');
        });
      },
      (error) => {
        console.error('Hesaplar silinirken bir hata oluştu(forkjoin):', error);
      }
    );
  }

  toggleSelectedAccountsStatus(): void {
    const selectedAccounts = this.accounts.filter((account) => account.selected);
    selectedAccounts.forEach((account) => {
      this.accountsService.toggleAccountStatus(account).subscribe(() => {
        this.loadAccounts();
      });
    });
  
    // Seçilen hesapların durumunu güncelledik, şimdi bu değişiklikleri backend'e kaydedelim.
    this.accountsService.saveChanges().subscribe(
      () => {
        // Save işlemi tamamlandıktan sonra yapılacak işlemler
        this.loadAccounts();
      },
      (error) => {
        console.error('Hesaplar kaydedilirken bir hata oluştu:', error);
      }
    );
  }
  
  goBack() {
    this.location.back();
  }
}
function account(value: Account, index: number, array: Account[]): void {
  throw new Error('Function not implemented.');
}

