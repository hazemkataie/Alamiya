//alamiya.service.service.ts

import { Injectable } from '@angular/core';
import { Account } from './account';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class AccountsService {
  private accounts: Account[] = [];
  private accountsUrl = 'http://localhost:3000/api/accounts'; // Backend API'nin adresini buraya yazın
  numberOfAccounts: number = 0;

  constructor(private http: HttpClient, private loadingService: LoadingService) {
    // Load the accounts when the service is instantiated
    this.loadAccounts();
  }

  // Load accounts from the API
  private loadAccounts(): void {
    this.loadingService.showLoading();

    this.getAccountsFromApi().subscribe(
      (accounts) => {
        this.accounts = accounts;
        this.loadingService.hideLoading();
      },
      (error) => {
        console.error('Hesaplar yüklenirken bir hata oluştu:', error);
        this.loadingService.hideLoading();
      }
    );
  }

  // Get all accounts from the API
  getAccountsFromApi(): Observable<Account[]> {

    // this.loadingService.showLoading();
    return this.http.get<Account[]>(this.accountsUrl).pipe(
      
      catchError((error) => {
        // this.loadingService.hideLoading();
        console.error('Hesaplar alınırken bir hata oluştu:', error);
        return throwError('Hesaplar alınırken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
      })
    );
  }

  // Save the changes to the accounts in the API
  private saveChangesToApi(accounts: Account[]): Observable<any> {
    // this.loadingService.showLoading();
    this.loadingService.showLoading();
    return this.http.put(this.accountsUrl, accounts).pipe(
      tap(()=>{
        this.loadingService.hideLoading();
      }),
      catchError((error) => { 
        this.loadingService.hideLoading();
        return throwError('Hesaplar güncellenirken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
      })
    );
  }

  // Get all accounts
  getAccounts(): Account[] {
    // this.loadingService.showLoading();
    return this.accounts;
  }

  // Get the count of active accounts
  getActiveAccountsCount(): Observable<number> {
    return this.getAccountsFromApi().pipe(
      map((accounts) => accounts.filter((account) => account.status).length),
      catchError((error) => {
        console.error('Aktif hesap sayısı alınırken bir hata oluştu:', error);
        return throwError('Aktif hesap sayısı alınırken bir hata oluştu.');
      })
    );
  }

  // Get the IDs of active accounts
  getActiveAccountsId(): Observable<number[]> {
    return this.getActiveAccounts().pipe(
      map((accounts) => accounts.map((account) => account.id)),
      catchError((error) => {
        console.error('Aktif hesap ID\'leri alınırken bir hata oluştu:', error);
        return throwError('Aktif hesap ID\'leri alınırken bir hata oluştu.');
      })
    );
  }

  // Get the active accounts
  getActiveAccounts(): Observable<Account[]> {
    return this.getAccountsFromApi().pipe(
      map((accounts) => accounts.filter((account) => account.status)),
      catchError((error) => {
        console.error('Aktif hesaplar alınırken bir hata oluştu:', error);
        return throwError('Aktif hesaplar alınırken bir hata oluştu.');
      })
    );
  }  

  addAccount(account: Account): Observable<Account> {
    const newId = this.accounts.length > 0 ? this.accounts[this.accounts.length - 1].id + 1 : 1;
    const newAccount: Account = { ...account, id: newId, server: 4200, status: false, selected: false };
    this.loadingService.showLoading();
    return this.http.post<Account>(this.accountsUrl, newAccount).pipe(
      tap((addedAccount) => {
        this.loadingService.hideLoading();
        this.accounts.push(addedAccount);
        this.numberOfAccounts = this.accounts.length;
        this.saveChangesToApi(this.accounts).subscribe(() => this.loadAccounts());
      }),
      catchError((error) => {
        this.loadingService.hideLoading();
        console.error('Hesap eklenirken bir hata oluştu:', error);
        return throwError('Hesap eklenirken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
      })
    );
  }

  toggleAccountStatus(account: Account): Observable<any> {
    if (account.username.trim() !== '' && account.password !== null) {
      const updatedAccount: Account = { ...account, status: !account.status };
      this.loadingService.showLoading();
      return this.http.put(`${this.accountsUrl}/${account.id}`, updatedAccount).pipe(
        tap(() => {
          this.loadingService.hideLoading();
          // Backend'e başarılı bir şekilde güncellendiğinde, yerel hesap nesnesinin durumunu da güncelleyelim.
          account.status = !account.status;
          account.selected = !account.selected;
        }),
        catchError((error) => {
          this.loadingService.hideLoading();
          console.error('Hesap durumu güncellenirken bir hata oluştu:', error);
          return throwError('Hesap durumu güncellenirken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
        })
      );
    }
    return throwError('Geçersiz kullanıcı adı veya şifre');
  }

  deleteAccount(account: Account): Observable<any> {
    const deleteUrl = `${this.accountsUrl}/${account.id}`; // Backend API'deki hesap silme endpoint'inin tam URL'si
    this.loadingService.showLoading();
    return this.http.delete(deleteUrl).pipe(
      tap(() => {
        this.loadingService.hideLoading();
        // Başarılı ise frontend listesinden de hesabı silin:
        const index = this.accounts.findIndex((acc) => acc.id === account.id);
        if (index !== -1) {
          this.accounts.splice(index, 1);
        }
      }),
      catchError((error) => {
        this.loadingService.hideLoading();
        console.error('Hesap silinirken bir hata oluştu:', error);
        return throwError('Hesap silinirken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
      })
    );
  }

  updateAccount(account: Account): Observable<any> {
    const index = this.accounts.findIndex((acc) => acc.id === account.id);
    if (index !== -1) {
      // Yerel hesap listesinde güncellenen hesabı güncelleyin
      this.accounts[index] = account;
      // Güncellenen hesabı backend API'ye gönderin
      this.loadingService.showLoading();
      return this.http.put(`${this.accountsUrl}/${account.id}`, account).pipe(
        tap(() => {
          this.loadingService.hideLoading();
        }),
        catchError((error) => {
          this.loadingService.hideLoading();
          console.error('Hesap güncellenirken bir hata oluştu:', error);
          return throwError('Hesap güncellenirken bir hata oluştu.');
        })
      );
    } else {
      this.loadingService.hideLoading();
      return throwError('Böyle bir hesap bulunamadı.');
    }
  }
   

  saveChanges(): Observable<any> {
    return this.saveChangesToApi(this.accounts);
  }
}
