import { Component } from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todoItems: any[] = [];
  searchItems: any[] = [];
  text: string = '';
  searchTerm: string = '';

  constructor(private todoService: TodoServiceService) {
    this.fetchTodoItems();
  }

  
  fetchSearchedItems() {
    console.log('Fetching search items...');
    if (this.searchTerm) {
      this.todoService.getSearchedItems(this.searchTerm).subscribe(items => {
        console.log('Received search items:', items);
        this.searchItems = items;
      });
    } else {
      this.searchItems = [];
    }
    this.searchTerm = '';
  }

  fetchTodoItems() {
    console.log('Fetching todo items...');
    this.todoService.getTodoItems().subscribe(items => {
      console.log('Received todo items:', items);
      this.todoItems = items;
    });
  }

  addTodoItem() {
    const newTodo = {
      title: this.text,
      completed: false
    };

    this.todoService.addTodoItem(newTodo).subscribe(() => {
      this.fetchTodoItems();
      console.log(this.todoItems);
      this.text = '';
    });
  }

  deleteTodoItem(id: number) {
    this.todoService.deleteTodoItem(id).subscribe(() => {
      this.fetchTodoItems();
    });
  }

  markTodoItemComplete(todoItem: any) {
    const updatedCompleted = !todoItem.completed;
    this.todoService.markTodoItemComplete(todoItem.id, updatedCompleted).subscribe(() => {
      this.fetchTodoItems();
    });
  }

  //method to count the incomplete items based on the value of the completed property
  countIncompleteItems(todoItems: any[]) {
    let counter: number = 0;
    for (const todoItem of todoItems) {
      if (todoItem.completed == false) {
        counter++;
      }
    }
    return counter;
  }
}
