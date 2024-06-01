import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKanbanCardComponent } from './edit-kanban-card.component';

describe('EditKanbanCardComponent', () => {
  let component: EditKanbanCardComponent;
  let fixture: ComponentFixture<EditKanbanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditKanbanCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditKanbanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
