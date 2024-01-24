import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../Services/Project/project.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-bookmanage',
  templateUrl: './bookmanage.component.html',
  styleUrls: ['./bookmanage.component.css']
})
export class BookmanageComponent implements OnInit {
  BookForm : FormGroup
  loading:boolean = false;

  constructor(private bookService : ProjectService,private router : Router,private toastr : ToastrService) {
  }
  ngOnInit(){
    this.BookForm = new FormGroup({
      bookname : new FormControl(null,Validators.required),
      authorname : new FormControl(null,Validators.required),
      bookdescription : new FormControl(null,[Validators.required,Validators.minLength(60)]),
      imgurl : new FormControl
      (null,Validators.required)
    })
  }

  handleChange(event:any){
    const imageUrl = event.target.value;
    this.BookForm.get('imgurl').setValue(imageUrl);
  }
  AddBook(){
    this.loading = true
    // this.bookService.createBook(this.BookForm.value).subscribe((res)=>{
    //   this.loading = false
    //   this.router.navigate(['dashboard'])
    //   this.toastr.success("Book Added Successfully")
    // },(err)=>{
    //   this.loading = false
    // })
  }
}
