
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from "../models/user.model";
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  TOKEN_KEY = "token";
  EMAIL_KEY = "email";

  user: User | null = null;
  userListener: Subject<User | null> = new Subject();
  API_URL = "http://localhost:3007/api/";
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3007';
    
   }

   getAll(uri: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}`);
  }

  getSingle(uri: string, id: string) {
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}/${id}`);
  }

  getProductsByTheme1(uri: string, theme: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}/${theme}`);
  }

  get(uri: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, data);
  }

  put(uri: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.ROOT_URL}/${uri}`, data);
  }

  delete(uri: String): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  register({user, password}: {user: User, password: string}) {
    this.http.post<{token: string, user: User} | {error: any}>(this.API_URL + "register",
        {
            email: user.email,
            password
        })
        .subscribe((response) => {
            if ("error" in response) {
                console.log(response.error);
            }
            else {
                const token = response.token;
                localStorage.setItem(this.TOKEN_KEY, token);
                
                this.user = response.user;
                this.userListener.next(this.user);
            }
        })
}

login({email, password}: {email: string, password: string}) {
    this.http.post<{ token: string, user: User } | { error: any }>(
        `${this.API_URL}login`,
        { email, password }
    ).subscribe({
        next: (response) => {
            if ('error' in response) {
                console.log(response.error);
            } else {
                const token = response.token;
                localStorage.setItem(this.EMAIL_KEY, email);
                localStorage.setItem(this.TOKEN_KEY, token);
                this.user = response.user;
                this.userListener.next(this.user);
            }
        },
        error: (err) => {
            console.error('HTTP error:', err);
            // Handle HTTP error
        }
    });
}

isLoggedIn(): boolean {
    return this.user !== null;
}

getUser(): User | null {
    return this.user;
}

getUserListener(): Observable<User | null> {
    return this.userListener.asObservable();
}

autoLogIn(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
        try {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const expirationDate = new Date(tokenPayload.exp * 1000); // Convert seconds to milliseconds
            if (new Date().getTime() < expirationDate.getTime()) {
                this.retrieveUser(tokenPayload.email);
            } else {
                console.error('Token has expired');
            }
        } catch (error) {
            console.error('Failed to parse token payload:', error);
            // Handle token parsing error (e.g., clear token, log out user, etc.)
            this.logout();
        }
    }
}

retrieveUser(email: string): void {
    this.http.get<User | null>(this.API_URL + email)
        .subscribe((user: User | null) => {
            if (user) {
                this.user = user;
                this.userListener.next(user);
            }
        });
}

logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.user = null;
    this.userListener.next(null);
}
}