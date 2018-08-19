import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Blog } from "../models/blog.model";
import { Reactie } from "../models/reactie.model";
import { AuthenticationService } from "../user/authentication.service";

@Injectable()
export class KenniscentrumService {

  private _url = '/API/kenniscentrum';

  constructor(private http: Http, private auth: AuthenticationService) { }

  getBlogsZonderReacties() { // om weer te geven in de lijst
    return this.http.get(`${this._url}/blogs`)
      .map(response => response.json().map(item => Blog.fromJSON(item)));
  }

  getFullBlog(blogId: string): Observable<Blog> {
    return this.http.get(`${this._url}/blog/${blogId}`)
      .map(response => response.json()).map(item => Blog.fromJSON(item));
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post(`${this._url}/blogs`, { blog: blog })
      .map(response => response.json()).map(item => Blog.fromJSON(item));
  }

  postReactie(blogId: string, reactie: Reactie): Observable<Reactie> {
    return this.http.post(`${this._url}/reactie/${blogId}`, { reactie: reactie })
      .map(response => response.json()).map(item => Reactie.fromJSON(item));
  }

}
