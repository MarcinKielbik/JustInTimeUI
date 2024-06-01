import { Injectable } from '@angular/core';
import { TokenApiModel } from '../models/token-api.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7148/api/Auth/';
  private userPayload: any;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.getDecodedToken();
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  signUp(userObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  signIn(loginObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
      .pipe(
        tap(response => {
          this.saveTokens(response.accessToken, response.refreshToken);
          this.storeUserId(response.userId); // Store userId
        })
      );
  }

  signOut(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
    this.router.navigate(['login']);
  }

  storeToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    }
  }

  storeRefreshToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('refreshToken', token);
    }
  }

  storeUserId(userId: number): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('userId', userId.toString());
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  getUserId(): number | null {
    if (this.isLocalStorageAvailable()) {
      const userId = localStorage.getItem('userId');
      return userId ? parseInt(userId, 10) : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getDecodedToken(): any { // Zmieniono nazwę metody na `getDecodedToken`
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  getFullNameFromToken(): string | null {
    return this.userPayload ? this.userPayload.unique_name : null;
  }

  getRoleFromToken(): string | null {
    return this.userPayload ? this.userPayload.role : null;
  }

  renewToken(tokenApi: TokenApiModel): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi).pipe(
      tap(response => {
        this.saveTokens(response.accessToken, response.refreshToken);
      }),
      catchError(error => {
        this.signOut();
        return of(null);
      })
    );
  }

  ensureTokenValidity(): Observable<string | null> {
    const token = this.getToken();
    if (token && this.jwtHelper.isTokenExpired(token)) {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        const tokenApiModel = new TokenApiModel();
        tokenApiModel.accessToken = token;
        tokenApiModel.refreshToken = refreshToken;
        return this.renewToken(tokenApiModel);
      } else {
        this.signOut();
        return of(null);
      }
    } else {
      return of(token);
    }
  }

  public saveTokens(accessToken: string, refreshToken: string): void {
    this.storeToken(accessToken);
    this.storeRefreshToken(refreshToken);
    this.userPayload = this.getDecodedToken();
  }
}
