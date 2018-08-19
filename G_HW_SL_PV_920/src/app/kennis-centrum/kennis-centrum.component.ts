import { Component, OnInit } from '@angular/core';
import { Blog } from "../models/blog.model";
import { KenniscentrumService } from "./kenniscentrum.service";
import { MdDialog, MdDialogRef } from '@angular/material';
import { AddBlogComponent } from "./add-blog/add-blog.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-kennis-centrum',
  templateUrl: './kennis-centrum.component.html',
  styleUrls: ['./kennis-centrum.component.css']
})
export class KennisCentrumComponent implements OnInit {

  blogs: Blog[];

  constructor(private kenniscentrumService: KenniscentrumService, private dialog: MdDialog, private router: Router) { }

  ngOnInit() {
    this.kenniscentrumService.getBlogsZonderReacties().subscribe(blogs => {
      this.blogs = blogs
      this.blogs.reverse(); //laatst toegevoegde komt bovenaan
    });
  }

  openBlog(id: string) {
    this.router.navigate([`/kenniscentrum/blog/${id}`]);
  }

  nieuweBlogToevoegenClick() {
    const dialogRef = this.dialog.open(AddBlogComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        this.kenniscentrumService.createBlog(result).subscribe(blog => {
          this.blogs.push(blog);
        });
      }
    });
  }

}
