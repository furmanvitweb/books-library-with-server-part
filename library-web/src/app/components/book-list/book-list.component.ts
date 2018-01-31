import { Component, OnInit, ViewChild } from '@angular/core';
import * as M from '../../app.models';
import { BookService } from '../../services/book/book.service';

@Component({
   selector: 'book-list',
   templateUrl: 'book-list.component.html'
})
export class BookListComponent implements OnInit {
   books: M.Book[];

   constructor(private bookService: BookService) { }

   ngOnInit() {
      this.loadData();
   }

   loadData() {
      this.bookService.getAllBooksFromServer().subscribe(res => {
        this.books = res;
        this.bookService.books = this.books;
      },
         err => {
            console.error('Error occured');
         });
   }
}
