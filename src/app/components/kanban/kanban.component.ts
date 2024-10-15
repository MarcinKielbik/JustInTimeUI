import { Component, OnInit } from '@angular/core';
import { KanbanService } from '../../services/kanban.service';
import { KanbanCard } from '../../models/kanban-card.model';


/**
 * @class KanbanComponent
*/

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  kanbanCards: KanbanCard[] = [];
  kanbanCardToEdit?: KanbanCard;
  displayedColumns: string[] = ['name', 'description', 'status', 'actions'];

  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
    this.kanbanService.getKanbanCards().subscribe(cards => {
      this.kanbanCards = cards;
      console.log(cards);
    });
  }

  initNewKanban(): void {
    this.kanbanCardToEdit = new KanbanCard()
  }

  updateKanbanList(cards: KanbanCard[]): void {
    this.kanbanCards = cards;
  }

  editKanbanCard(card: KanbanCard): void {
    this.kanbanCardToEdit = card;
  }

}
