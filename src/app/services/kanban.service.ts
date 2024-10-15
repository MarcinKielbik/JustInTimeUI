import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KanbanCard } from '../models/kanban-card.model';
import { AuthService } from './auth.service';


/**
 * @class KanbanService
 */

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  private apiUrl = 'https://localhost:7148/api/Kanban'; // URL backendu
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getKanbanCards(): Observable<KanbanCard[]> {
    return this.http.get<KanbanCard[]>(`${this.apiUrl}/cards`);
  }

  public addKanbanCard(card: KanbanCard): Observable<KanbanCard> {
    const userId = this.authService.getUserId(); // Pobierz id zalogowanego użytkownika
    if (userId === null) {
      throw new Error('Użytkownik nie jest zalogowany.');
    }
    card.userId = userId; // Przypisz id użytkownika do karty Kanban
    return this.http.post<KanbanCard>(`${this.apiUrl}/cards`, card);
  }

  public updateKanbanCard(card: KanbanCard): Observable<KanbanCard[]> {
    return this.http.put<KanbanCard[]>(`${this.apiUrl}/cards/${card.id}`, card);
  }

  public deleteKanbanCard(card: KanbanCard): Observable<KanbanCard[]> {
    return this.http.delete<KanbanCard[]>(`${this.apiUrl}/cards/${card.id}`);
  }

}
