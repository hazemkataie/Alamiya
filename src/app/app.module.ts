import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsService } from './alamiya.service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
