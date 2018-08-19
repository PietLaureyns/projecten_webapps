import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Blog } from "../../models/blog.model";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  blog: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MdDialogRef<AddBlogComponent>,
    @Inject(MD_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.blog = this.fb.group({
      titel: ["", [Validators.required, Validators.minLength(2)]],
      beschrijving: ["", [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    let nieuweBlog = new Blog(
      this.blog.value.titel,
      this.blog.value.beschrijving,
      new Date(),
      []
    );
    this.dialogRef.close(nieuweBlog);
  }

  annuleer(): void {
    this.dialogRef.close();
  }
}
