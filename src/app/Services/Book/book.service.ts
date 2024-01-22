import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  pipe = new DatePipe('en-US')
  constructor(private http : HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get("https://localhost:7135/api/Book");
  }

  createBook(bookData:any):Observable<any>{
    return this.http.post("https://localhost:7135/api/Book/create",{
      bookName:bookData.bookname,
      bookAuthor:bookData.authorname,
      bookDescription:bookData.bookdescription,
      imgUrl:bookData.imgurl

    })
  }
  getBookById(id:any):Observable<any>{
    return this.http.get(`https://localhost:7135/api/Book/${id}`);
  }

  DeleteBook(id:any):Observable<any>{
    return this.http.delete(`https://localhost:7135/api/Book/${id}`)
  }
 
}
