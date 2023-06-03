import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Creation of a TodoService to accommodate features, such as fetch, add, delete, and mark data as completed, 
//either from the server or to the server.

@Injectable({
  providedIn: 'root' //Service is visible throughout the application
})
export class TodoServiceService {

  //URL for the API endpoint that contains todo items
  private apiUrl = 'https://instinctive-fork-snarl.glitch.me/todos'; 

  /*inject an instance of the HttpClient module as a dependency into the TodoService, to allow communication with the 
    HTTP servers and the creation of HTTP requests*/
  constructor(private http: HttpClient) { } 

  /*method to get the searched items that takes a string parameter for the search term and returns 
    an Observable that represents an array of any type to the caller which allows him to
    subscribe to the emitted values and handle them accordingly.*/
 getSearchedItems(searchTerm: string): Observable<any[]> {

  /*template literal to construct the proper url by inserting dynamically the url api, followed by the ?q= part to search,
    and finally the search term the user entered.*/
  const url = `${this.apiUrl}?q=${searchTerm}`; 
  return this.http.get<any[]>(url);
 }                        

  /*method to get all the todo items that takes no parameters and 
    returns an Observable that represents an array of any type to the caller which allows him to subscribe
    to the emitted values and handle them accordingly.*/                                     
  getTodoItems(currentPage: number, pageSize: number): Observable<any[]> { 
    const url = `${this.apiUrl}?_page=${currentPage}&_limit=${pageSize}`;
    return this.http.get<any[]>(url);
  }

  getAllTodoItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  /*method to add a todo item to the server that takes a parameter for the new todo and returns 
    an Observable that emits the response to the caller which allows him to subscribe 
    to the emitted values and handle them accordingly.*/
  addTodoItem(newTodo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newTodo);
  }
  /*method to delete a todo item from the server that takes a number for the id and 
    returns an Observable that emits the response to the caller which allows him to subscribe
    to the emitted values and handle them accordingly.*/
  deleteTodoItem(id: number): Observable<any> {

    /*template literal to construct the proper url by inserting dynamically the url api, followed by a slash (/) and 
      the id of the item to be deleted.*/
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  /*method to mark a todo item as completed from the server that takes a number for the id and a boolean, which indicates
    if the todo item is completed or not and returns an Observable that emits the response to the caller
    which allows him to subscribe to the emitted values and handle them accordingly.*/
  markTodoItemComplete(id: number, completed: boolean): Observable<any> {
    const url = `${this.apiUrl}/${id}`;

    //we create a new object with a single property, completed with the value of the completed parameter. This object
    //represents the change of the todo item that we want to apply on the server
    //http.patch allows us to partially update a todo item on the server.
    const updatedTodo = {completed: completed}; 
                                                
    return this.http.patch<any>(url, updatedTodo);
  }
 }
