import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AlertModule, ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookComponent } from './components/book/book.component';
import { BookPopupComponent } from './components/book-popup/book-popup.component';
import { BookService } from './services/book/book.service';
import { NetService } from './services/net/net.service';


@NgModule({
  declarations: [
    /* Components */
    HomeComponent,
    SiteHeaderComponent,
    BookListComponent,
    BookComponent,
    BookPopupComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    
  ],
  providers: [
    /* Services */
    BookService,
    NetService
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
