import { Component } from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  /********************
   Pagination variables
   *******************/
   currentPage: number = 1;
   totalPages: number = 0;
   pageSize: number = 10;

  constructor(private todoService: TodoServiceService) {
    this.fetchTodoItems();
  }

  //method to fetch the searched items based on the search query the user provided from the server
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

  //method to fetch all todo items from the server
  fetchTodoItems() {
    console.log('Fetching todo items...');
    this.todoService.getTodoItems(this.currentPage, this.pageSize).subscribe(items => {
      console.log('Received todo items:', items);
      this.todoItems = items;  
    });
  }

  //method to add a new todo item to the list
  addTodoItem() {
    const newTodo = {
      title: this.text,
      completed: false
    };

    this.todoService.addTodoItem(newTodo).subscribe(() => {
      this.fetchTodoItems();
      this.text = '';
    });
  }

  //method to delete a specific item, based on the id of said item, from the list
  deleteTodoItem(id: number) {
    this.todoService.deleteTodoItem(id).subscribe(() => {
      this.fetchTodoItems();
    });
  }

  //method to mark a todo item either complete or not
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

  goToPage(currentPage: number) {
    this.getTotalPages().subscribe((totalPages: number) => {
      if (currentPage >=1 && currentPage <= totalPages) {
        this.currentPage = currentPage;
        this.fetchTodoItems();
      }
    });
  }
  

  getTotalPages(): Observable<number> {
    return this.todoService.getAllTodoItems().pipe(
      map(items => Math.ceil(items.length / this.pageSize))
    );
  }
 }
