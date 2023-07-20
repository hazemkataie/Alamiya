import { Injectable } from '@angular/core';
import { Account } from './account';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AccountsService {
  private accounts: Account[] = []
  private accountsUrl = 'http://localhost:3000/api/accounts'; // Backend API'nin adresini buraya yazın
  liveAccount: number = 0;

  constructor(private http: HttpClient) {
    // Load the accounts when the service is instantiated

    this.loadAccounts();
  }

  // Load accounts from the API
  private loadAccounts(): void {
    this.getAccountsFromApi().subscribe(
      {next:(accounts) => {
        this.accounts = accounts;
      },
     error: (error) => {
        console.error('Hesaplar yüklenirken bir hata oluştu:', error);
      }}
    );
  }

  // Get all accounts from the API
  getAccountsFromApi(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl).pipe(
      catchError((error) => {
        console.error('Hesaplar alınırken bir hata oluştu:', error);
        return throwError('Hesaplar alınırken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
      })
    );
  }

  // Save the changes to the accounts in the API
  private saveChangesToApi(accounts: Account[]): Observable<any> {
    return this.http.put(this.accountsUrl, accounts).pipe(
      catchError((error) => {
        console.error('Hesaplar güncellenirken bir hata oluştu:', error);
        return throwError('Hesaplar güncellenirken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
      })
    );
  }

  // Get all accounts
  getAccounts(): Account[] {
    return this.accounts;
  }

  // Get the count of active accounts
  getActiveAccountsCount(): number {
    return this.accounts.filter((account) => account.status).length;
  }

  // Get the IDs of active accounts
  getActiveAccountsId(): number[] {
    return this.accounts.filter((account) => account.status).map((account) => account.id);
  }

  // Get the active accounts
  getActiveAccounts(): Account[] {
    return this.accounts.filter((account) => account.status);
  }

  addAccount(account: Account): Observable<Account> {
    const newId = this.accounts.length > 0 ? this.accounts[this.accounts.length - 1].id + 1 : 1;
    const newAccount: Account = { ...account, id: newId, server: 4200, status: false, selected: false };

    return this.http.post<Account>(this.accountsUrl, newAccount).pipe(
      tap((addedAccount) => {
        this.accounts.push(addedAccount);
        this.liveAccount = this.accounts.length;
        this.saveChangesToApi(this.accounts).subscribe();
      }),
      catchError((error) => {
        console.error('Hesap eklenirken bir hata oluştu:', error);
        return throwError('Hesap eklenirken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
      })
    );
  }

  toggleAccountStatus(account: Account): Observable<any> {
    if (account.username.trim() !== '' && account.password !== null) {
      const updatedAccount: Account = { ...account, status: !account.status };
  
      return this.http.put(`${this.accountsUrl}/${account.id}`, updatedAccount).pipe(
        tap(() => {
          // Backend'e başarılı bir şekilde güncellendiğinde, yerel hesap nesnesinin durumunu da güncelleyelim.
          account.status = !account.status;
        }),
        catchError((error) => {
          console.error('Hesap durumu güncellenirken bir hata oluştu:', error);
          return throwError('Hesap durumu güncellenirken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
        })
      );
    }
    return of(null);
  }
  
  
  

  deleteAccount(account: Account): Observable<any> {
    const deleteUrl = `${this.accountsUrl}/${account.id}`; // Backend API'deki hesap silme endpoint'inin tam URL'si
    return this.http.delete(deleteUrl).pipe(
      tap(() => {
        // Başarılı ise frontend listesinden de hesabı silin:
        const index = this.accounts.findIndex((acc) => acc.id === account.id);
        if (index !== -1) {
          this.accounts.splice(index, 1);
        }
      }),
      catchError((error) => {
        console.error('Hesap silinirken bir hata oluştu:', error);
        return throwError('Hesap silinirken bir hata oluştu.'); // Hata durumunda observable hatası fırlat
      })
    );
  }
  

  

  updateAccount(account: Account): Observable<any> {
    const index = this.accounts.findIndex((acc) => acc.id === account.id);
    if (index !== -1) {
      this.accounts[index] = account;
      return this.saveChangesToApi(this.accounts); // account'u değişikliklerle birlikte gönderin
    }
    return of(null); // Hesap bulunamadıysa null döndür
  }
  

  saveChanges(): Observable<any> {
    return this.saveChangesToApi(this.accounts);
}

}
