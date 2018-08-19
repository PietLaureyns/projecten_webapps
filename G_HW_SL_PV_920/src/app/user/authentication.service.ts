import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {

  private _url = '/API/users';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: Http, private router: Router) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<string>(currentUser && currentUser.id);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login`, { username: email, password: password })
      .map(res => res.json()).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ id: res.id, token: token }));
          this._user$.next(res.id);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
      this.router.navigate(['/homepage']);
    }
  }

  register(email: string, password: string, voornaam: string, familienaam: string): Observable<boolean> {
    return this.http.post(`${this._url}/registreer`, { username: email, password: password, voornaam:voornaam, familienaam: familienaam })
      .map(res => res.json()).map(res => {
        const token = res.token;
        if (token) {
          console.log(res);
          localStorage.setItem('currentUser', JSON.stringify({ id: res.id, token: res.token }));
          this._user$.next(res.id);
          return true;
        } else {
          return false;
        }
      });
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.post(`/API/users/checkemail`, { email:email }).map(res => res.json())
      .map(item => {
        if (item.email === 'emailAlreadyExists') {
          return false;
        } else {
          return true;
        }
      });
  }
  //${this._url}/checkemail
}
