import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/Project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-singlebook',
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {
  book: any;
  id: any
  pipe = new DatePipe('en-US')
  constructor(private bookService: ProjectService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getBook()
  }
  getBook() {
    // this.bookService.getBookById(this.id).subscribe(
    //   (res) => {
    //     this.book = res
    //     console.log(res)
    //   },
    //   (err) => {
    //     console.log(err);
    //   })
  }
  getDate(date:any){
    const myFormattedDate = this.pipe.transform(date, 'short');
    return myFormattedDate
  }
}

