import { Injectable } from '@angular/core';
import { NetService } from '../../services/net/net.service';
import * as M from '../../app.models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookService {
    currentBook: M.Book;
    books: M.Book[];

    constructor(private net: NetService) {
        this.books = [];
    }

    initDefaultBook(): M.Book {
        this.currentBook = {
            id: '',
            date: '',
            title: '',
            author: '',
            img: ''
        };
        return this.currentBook;
    }

    saveNewBook(currentBook: M.Book) {
        this.books.push(currentBook);
    }

    saveExistBook(currentBook: M.Book, bookId: string) {
        let existBookIndex = this.findIndexOfExistBookById(bookId);
        this.books[existBookIndex] = currentBook;
    }

    findIndexOfExistBookById(id: string): number {
        let ExistBookIndex = this.books.findIndex((book) => {
            return book.id === id;
        });
        return ExistBookIndex;
    }

    deleteBook(currentBook: M.Book, bookTitle: string) {
        let result = confirm(`Are sure, that you want to delete "${currentBook.title}'s book"?`);
        if (result) {
            let index = this.books.indexOf(currentBook);
            if (index > - 1) {
                this.books.splice(index, 1);
            }
        }
    }

    validateTitleForNewBook(currentBook: M.Book, books: M.Book[]): boolean {
        let currentTitleIsExist = books.some(elem => {
            return currentBook.title.toLowerCase() === elem.title.toLowerCase();
        });
        return currentTitleIsExist;
    }

    validateCurrentBookTitle(currentBook: M.Book): boolean {
        let isTitleOfCurrentBook = this.books.some(elem => {
            if (currentBook.id === elem.id) {
                if (currentBook.title.toLowerCase() === elem.title.toLowerCase()) {
                    return true;
                }
            }
        });
        return isTitleOfCurrentBook;
    }

    validateTitleForExistBook(currentBook: M.Book): boolean {
        let titleForEditableBookIsExist = this.books.some(elem => {
            let isCurrentBookTitle = this.validateCurrentBookTitle(currentBook);
            if (isCurrentBookTitle) {
                return false;
            } else {
                if (currentBook.title.toLowerCase() === elem.title.toLowerCase()) {
                    return true;
                }
            }
        });
        return titleForEditableBookIsExist;
    }

    getAllBooksFromServer(): Observable<M.Book[]> {
        return this.net.getAllBooks();
    }
}
