import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KenniscentrumService } from "../kenniscentrum.service";
import { Blog } from "../../models/blog.model";
import { Reactie } from "../../models/reactie.model";
import { AddReactieComponent } from '../add-reactie/add-reactie.component';
import { MdDialog } from '@angular/material';
import { GebruikerService } from '../../gebruiker.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogId: string;
  blog: Blog;
  reactie: Reactie;
  userId: string;
  kleur: string;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MdDialog,
    private gebruikerService: GebruikerService, private kenniscentrumService: KenniscentrumService) { }

  ngOnInit() {
    this.gebruikerService.ingelogdeGebruiker.subscribe(gebruiker => {
      this.userId = gebruiker.id;
      this.kleur = gebruiker.kleur;
    });
    this.route.params.subscribe(params => this.blogId = params['id']);
    this.kenniscentrumService.getFullBlog(this.blogId).subscribe(blog => {
      this.blog = blog;
      this.reactie = this.blog.reacties[0];
    });
  }

  nieuweReactieToevoegenClick() {
    const dialogRef = this.dialog.open(AddReactieComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        this.kenniscentrumService.postReactie(this.blogId, result).subscribe(reactie => {
          this.blog.reacties.push(reactie);
        });
      }
    });
  }

  backbtnClick() {
    this.router.navigateByUrl("/kenniscentrum");
  }
}
