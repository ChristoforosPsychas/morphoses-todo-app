import { Component } from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todoItems: any[] = [];
  text: string = '';

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

  addTodoItem() {
    const newTodo = {
      title: this.text,
      completed: false
    };

    this.todoService.addTodoItem(newTodo).subscribe(todoItem => {
      this.todoItems.push(todoItem);
      //this.fetchTodoItems();
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
