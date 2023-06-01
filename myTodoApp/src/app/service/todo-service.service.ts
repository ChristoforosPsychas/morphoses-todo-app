import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private apiUrl = 'https://instinctive-fork-snarl.glitch.me/todos'; //URL for the API endpoint that returns todo items

  constructor(private http: HttpClient) { } /*inject an instance of the HttpClient module as a 
                                              dependency into the TodoService, to allow communication with the 
                                              HTTP servers and the creation of HTTP requests*/

  getTodoItems(): Observable<any[]> {          /* we use http to send a req to the API, get the todo
                                               , and return it as an Observable object    */ 
    return this.http.get<any[]>(this.apiUrl);
  }

  addTodoItem(newTodo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newTodo);
  }

  deleteTodoItem(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
