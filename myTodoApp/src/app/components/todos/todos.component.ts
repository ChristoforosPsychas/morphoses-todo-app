import { Component } from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todoItems: any[] = [];
  //filteredTodoItems: any[] = [];
  text: string = '';

  constructor(private todoService: TodoServiceService) {
    this.fetchTodoItems();
  }

  fetchTodoItems() {
    console.log('Fetching todo items...');
    this.todoService.getTodoItems().subscribe(items => {
      console.log('Received todo items:', items);
      this.todoItems = items;
      /*this.applyFilter();*/
    });
  }

  /*applyFilter() {
    if (this.filterText.trim() === '') {
      this.filteredTodoItems = [];
    } else {
    this.filteredTodoItems = this.todoItems.filter(todoItem => {
      return todoItem.title.toLowerCase().includes(this.filterText.toLowerCase());
    });
  }
}*/

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

}
