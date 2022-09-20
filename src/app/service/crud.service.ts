import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
 url: string= '';
  constructor(private http:HttpClient) { 
   this.url='http://localhost:3000/tasks';
  }

  addTask(task: Task): Observable<Task> {
   return this.http.post<Task>(this.url,task);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  deleteTask(task : Task) : Observable<Task> {
    return this.http.delete<Task>(this.url + '/' + task.id);
  }

  updateTask(task: Task) : Observable<Task> {
    return this.http.put<Task>(this.url + '/' + task.id, task);
  }
}
