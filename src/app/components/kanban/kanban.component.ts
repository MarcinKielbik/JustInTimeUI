import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KanbanService } from '../../services/kanban.service';

import { MatTableDataSource } from '@angular/material/table';
import { KanbanCard } from '../../models/kanban-card.model';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {

  kanbanCards: KanbanCard[] = [];
  kanbanCardToEdit?: KanbanCard;
  //displayedColumns: string[] = ['Nazwa', 'Opis', 'Status', 'Akcje'];
  displayedColumns: string[] = ['name', 'description', 'status', 'actions'];

  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
    this.kanbanService.getKanbanCards().subscribe(cards => {
      this.kanbanCards = cards;
    });
  }

  initNewKanban(): void {
    this.kanbanCardToEdit = new KanbanCard(); // Zainicjuj nową kartę Kanban
  }

  updateKanbanList(cards: KanbanCard[]): void {
    this.kanbanCards = cards;
    //this.kanbanCardToEdit = null; // Poprawka: ustawienie wartości null po aktualizacji listy
  }

  editKanbanCard(card: KanbanCard): void {
    this.kanbanCardToEdit = card;
  }


  // ngOnInit(): void {
  //   this.loadKanbanCards();
  // }

  // loadKanbanCards() {
  //   this.kanbanService.getKanbanCards().subscribe(cards => {
  //     this.kanbanCards = cards;
  //   });
  // }

  // addCard() {
  //   const newCard: KanbanCard = {
  //     id: 0,
  //     name: 'Nowa karta',
  //     description: 'Opis nowej karty',
  //     status: 'Do zrobienia'
  //   };

  //   this.kanbanService.addKanbanCard(newCard).subscribe(() => {
  //     this.loadKanbanCards();
  //   });
  // }

  // editCard(card: KanbanCard) {
  //   this.kanbanService.updateKanbanCard(card).subscribe(() => {
  //     this.loadKanbanCards();
  //   });
  // }

  // deleteCard(card: KanbanCard) {
  //   this.kanbanService.deleteKanbanCard(card.id).subscribe(() => {
  //     this.loadKanbanCards();
  //   });
  // }

}
