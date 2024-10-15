import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KanbanCard } from '../../../models/kanban-card.model';
import { KanbanService } from '../../../services/kanban.service';
import { AuthService } from '../../../services/auth.service';


/**
 * @class EditKanbanCardComponent
*/

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-kanban-card',
  templateUrl: './edit-kanban-card.component.html',
  styleUrl: './edit-kanban-card.component.scss'
})
export class EditKanbanCardComponent {
  @Input() card?: KanbanCard;
  @Output() cardUpdated = new EventEmitter<KanbanCard[]>();

  displayedColumns: string[] = ['name', 'description', 'status'];

  // Status
  selectedValue!: string;
  selectedStatus!: string;

  statusOptions: Status[] = [
    { value: 'Do zrobienia', viewValue: 'Do zrobienia' },
    { value: 'W trakcie', viewValue: 'W trakcie' },
    { value: 'Wykonano', viewValue: 'Wykonano' }
  ];

  constructor(private kanbanService: KanbanService) { }

  addKanbanCard(card: KanbanCard): void {
    console.log('Dane wysyłane w żądaniu:', card);
    this.kanbanService.addKanbanCard(card).subscribe(
      (newCard: KanbanCard) => {
        this.cardUpdated.emit([newCard]);
        console.log('Karta została dodana:', newCard);
      },
      error => {
        console.error('Błąd podczas dodawania karty:', error);
      }
    );
  }

  updateKanbanCard(card: KanbanCard): void {
    this.kanbanService.updateKanbanCard(card).subscribe(
      (updatedCard: KanbanCard[]) => {
        this.cardUpdated.emit(updatedCard);
      },
      error => {
        console.error('Błąd podczas aktualizacji karty:', error);
      }
    );
  }

  deleteKanbanCard(card: KanbanCard): void {
    this.kanbanService.deleteKanbanCard(card).subscribe(
      () => {
        this.cardUpdated.emit([]);
      },
      error => {
        console.error('Błąd podczas usuwania karty:', error);
      }
    );
  }
}
