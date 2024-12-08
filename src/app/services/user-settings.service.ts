import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private usersUrl = 'https://localhost:7148/api/User';
  id: number | null = this.authService.getUserId();

  getUserById(): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${this.id}`);
  }

  updateUser(userSettings: User): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${this.id}`, userSettings);
  }
}
