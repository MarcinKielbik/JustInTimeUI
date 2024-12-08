import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KanbanService } from './kanban.service';
import { AuthService } from './auth.service';
import { KanbanCard } from '../models/kanban-card.model';

describe('KanbanService', () => {
  let service: KanbanService;
  let httpMock: HttpTestingController;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Tworzymy mock AuthService
    authServiceMock = jasmine.createSpyObj('AuthService', ['getUserId']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Symulowanie HTTP
      providers: [
        KanbanService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(KanbanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Weryfikacja, czy wszystkie żądania zostały zakończone
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve kanban cards from the API', () => {
    const mockCards: KanbanCard[] = [
      { id: 1, name: 'Card 1', description: 'Description 1', status: 'To Do', userId: 1 },
      { id: 2, name: 'Card 2', description: 'Description 2', status: 'In Progress', userId: 1 }
    ];

    service.getKanbanCards().subscribe(cards => {
      expect(cards.length).toBe(2);
      expect(cards).toEqual(mockCards);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/Kanban/cards');
    expect(req.request.method).toBe('GET');
    req.flush(mockCards);
  });

  it('should add a kanban card to the API', () => {
    const newCard: KanbanCard = { id: 3, name: 'Card 3', description: 'Description 3', status: 'To Do', userId: 1 };
    const userId = 1;
    
    authServiceMock.getUserId.and.returnValue(userId); // Mockowanie zwróconego ID użytkownika

    service.addKanbanCard(newCard).subscribe(card => {
      expect(card).toEqual(newCard);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/Kanban/cards');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.userId).toBe(userId); // Sprawdzamy, czy userId zostało dodane do karty
    req.flush(newCard);
  });

  it('should update a kanban card in the API', () => {
    const updatedCard: KanbanCard = { id: 1, name: 'Updated Card 1', description: 'Updated Description 1', status: 'In Progress', userId: 1 };

    service.updateKanbanCard(updatedCard).subscribe(card => {
      expect(card).toEqual([updatedCard]);
    });

    const req = httpMock.expectOne(`https://localhost:7148/api/Kanban/cards/${updatedCard.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush([updatedCard]);
  });

  it('should delete a kanban card from the API', () => {
    const cardToDelete: KanbanCard = { id: 1, name: 'Card 1', description: 'Description 1', status: 'To Do', userId: 1 };

    service.deleteKanbanCard(cardToDelete).subscribe(cards => {
      expect(cards).toEqual([cardToDelete]);
    });

    const req = httpMock.expectOne(`https://localhost:7148/api/Kanban/cards/${cardToDelete.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush([cardToDelete]);
  });

  it('should throw error if user is not logged in when adding a card', () => {
    const newCard: KanbanCard = { id: 3, name: 'Card 3', description: 'Description 3', status: 'To Do', userId: 1 };
    
    authServiceMock.getUserId.and.returnValue(null); // Mockowanie braku ID użytkownika

    expect(() => service.addKanbanCard(newCard)).toThrowError('Użytkownik nie jest zalogowany.');
  });
});
