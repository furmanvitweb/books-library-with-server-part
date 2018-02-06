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
        console.log('init BookService.books.length = ' + this.books.length);
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

    saveNewBook(newBook: M.Book) {
        console.log('BookService.addBook() | books.length = ' + this.books.length);
        if (this.books) {
            this.books.push(newBook);
        } else {
            this.getAllBooksFromServer().subscribe(res => {
                this.books = res;
                this.books.push(newBook);
            });
        }
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

    deleteBook(bookId: string, bookTitle: string, books) {
        let result = confirm(`Are sure, that you want to delete "${bookTitle}'s book"?`);
        if (result) {
            let index = books.indexOf(bookId);
            if (index > - 1) {
                books.splice(index, 1);
            }
            this.deleteBookFromServer(bookId).subscribe(res => {
                console.log(res);
            },
                err => {
                    console.log('Error occured');
                });
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

    getBookFromServer(bookId: string): Observable<M.Book> {
        return this.net.getBook(bookId);
    }

    addBookToServer(book: M.Book): Observable<string> {
        return this.net.addBook(book);
    }

    deleteBookFromServer(bookId: string): Observable<string> {
        return this.net.deleteBook(bookId);
    }
}
