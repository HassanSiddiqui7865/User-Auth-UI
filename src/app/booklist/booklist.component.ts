import { Component, OnInit } from '@angular/core';
import { BookService } from '../Services/Book/book.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit{
  bookList:any[]
  BookId:any
  pipe = new DatePipe('en-US')
  userrole:string
  loading:boolean = false
  constructor(private bookService : BookService,private router : Router,private toastr : ToastrService) {
  }
  ngOnInit(): void {
    this.userrole = JSON.parse(localStorage.getItem('login')).userrole
    this.getBooks()

  }

  getBooks(){
    this.bookService.getBooks().subscribe(
      (res:any[]) => {
       this.bookList =  res
      },
      (err) => {
        console.log(err);
      }
    );
  }
  handleNavigate(id:any){
    this.router.navigate([`dashboard/${id}`])
  }
  getDate(date:any){
    const myFormattedDate = this.pipe.transform(date, 'short');
    return myFormattedDate
  }
  openDeleteModal(id:any){
    this.BookId = id
    const modelDiv = document.getElementById('myModal')
    if(modelDiv!=null){
      modelDiv.style.display = 'block'
    }
  }
  CloseDeleteModel(){
    const modelDiv = document.getElementById('myModal')
    if(modelDiv!=null){
      modelDiv.style.display = 'none'
    }
  }
  handleDelete(){
    this.loading = true
    this.bookService.DeleteBook(this.BookId).subscribe(
      (res)=>{
        this.getBooks()
        this.loading = false
        this.CloseDeleteModel()
        this.toastr.success("Book Deleted Successfully")

    },(err)=>{
      this.loading = false
      this.toastr.error("An Error Occured")
    })
  }
}
