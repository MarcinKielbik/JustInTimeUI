import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KanbanCard } from '../../../models/kanban-card.model';
import { KanbanService } from '../../../services/kanban.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


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
    {value: 'Do zrobienia', viewValue: 'Do zrobienia'},
    {value: 'W trakcie', viewValue: 'W trakcie'},
    {value: 'Wykonano', viewValue: 'Wykonano'}
  ];

  constructor(private kananService: KanbanService) {

  }
  

  addKanbanCard(card: KanbanCard): void {
    console.log('Dane wysyłane w żądaniu:', card);
    this.kananService.addKanbanCard(card);
  }



  updateKanbanCard(card: KanbanCard): void {
    this.kananService.updateKanbanCard(card)
    .subscribe((cards: KanbanCard[]) => this.cardUpdated.emit(cards));
  }

  deleteKanbanCard(card: KanbanCard): void {
    this.kananService.deleteKanbanCard(card)
    .subscribe((cards: KanbanCard[]) => this.cardUpdated.emit(cards));
  }


}
