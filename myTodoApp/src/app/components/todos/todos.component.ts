import { Component } from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todoItems: any[] = [];

  constructor(private todoService: TodoServiceService) {
    this.fetchTodoItems();
  }

  fetchTodoItems() {
    console.log('Fetching todo items...');
    this.todoService.getTodoItems().subscribe(items => {
      console.log('Received todo items:', items);
      this.todoItems = items;
    });
  }

}
