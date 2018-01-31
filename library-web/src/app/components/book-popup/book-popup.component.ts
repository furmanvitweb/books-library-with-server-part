import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BookService } from '../../services/book/book.service';
import * as M from '../../app.models';

@Component({
    selector: 'book-popup',
    templateUrl: 'book-popup.component.html'
})
export class BookPopupComponent implements OnInit {
    @ViewChild('bookModal') public bookModal: ModalDirective;

    currentBook: M.Book;
    @Input() books: M.Book[];
    existBookId: string;
    isNewBook: boolean = false;


    constructor(private bookService: BookService) {
    }
    ngOnInit() {
        this.initCurrentBook();
    }

    initCurrentBook() {
        this.currentBook = this.bookService.initDefaultBook();
    }

    saveNewBook(currentBook: M.Book) {
        this.bookService.saveNewBook(currentBook);
    }

    initExistBook(existBook: M.Book) {
        this.isNewBook = false;
        this.existBookId = existBook.id;
        this.currentBook = {
            id: existBook.id,
            author: existBook.author,
            date: existBook.date,
            title: existBook.title,
            img: existBook.img
        };
    }

    updateExistBook(currentBook: M.Book) {
        this.bookService.updateExistBook(this.existBookId, currentBook);
    }

    saveNewOrExistBook(currentBook: M.Book) {
        if (this.isNewBook) {
            let titleIsExist = this.bookService.validateTitleForNewBook(currentBook, this.books);
            if (titleIsExist) {
                alert('Current title is exist');
            } else {
                this.saveNewBook(currentBook).subscribe(() => {});
                this.isNewBook = false;
                this.initCurrentBook();
                this.hideBookModal();
            }
        } else {
            let titleForEditableBookIsExist = this.bookService.validateTitleForExistBook(currentBook);
            if (titleForEditableBookIsExist) {
                alert('Current title is exist');
            } else {
                this.updateExistBook(currentBook);
                this.hideBookModal(); 
            }
        }
    }

    openNewBookModal() {
        this.isNewBook = true;
        this.showBookModal();
    }

    openExistBookModal(existBook: M.Book) {
        this.initExistBook(existBook);
        this.showBookModal();
    }

    exitWithoutChanges() {
        this.initCurrentBook();
        this.hideBookModal();
    }

    showBookModal(): void {
        this.bookModal.show();
    }

    hideBookModal(): void {
        this.bookModal.hide();
    }
}
