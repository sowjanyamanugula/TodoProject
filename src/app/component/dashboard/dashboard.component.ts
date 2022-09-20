import { Component, OnInit } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private cs:CrudService) { }
  tasksList:Task[] =[];
  taskname: string = '';
  taskObj = new Task();
  editTaskname: string ='';
  ngOnInit(): void {
    this.taskObj = new Task();
    this.tasksList = [];
    this.getAllTasks(); 

    this.editTaskname='';
    this.taskname = '';
   
  }

  addNewTask(){
    this.taskObj.name = this.taskname;
   this.cs.addTask(this.taskObj).subscribe(res =>{
    this.ngOnInit();
    this.taskname= '';
   },err => {
    console.log(err);
    
   })
  }

  getAllTasks(){
    this.cs.getAllTasks().subscribe(res => {
      this.tasksList = res;
    }, err => {
      alert(err);
    })
  }

  editTask(){
    this.taskObj.name = this.editTaskname;
    this.cs.updateTask(this.taskObj).subscribe(res => {
      this.getAllTasks();
    }, err => {
      alert(err)
    })
  }

  call(task: Task) {
    this.taskObj=task;
    this.editTaskname= task.name;
  }

  deleteTask(task: Task) {
    this.cs.deleteTask(task).subscribe(res => {
      this.getAllTasks();
    }, err => {
      alert(err);
    })
  }

}
