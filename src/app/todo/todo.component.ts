import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms"
import { HttpService } from '../http.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  public todoForm;
  public items;
  public showUpdate=false;
  public itemTemp;

  constructor(
    private fb:FormBuilder,
    private http:HttpService
  ) {

    this.todoForm=this.fb.group({
      name:[null,Validators.required]
    })
   }

  ngOnInit() {
    this.getAllItems();
  }
  public saveData(){
    this.http.addItem(this.todoForm.value).subscribe(res=>{
      this.getAllItems()
      this.todoForm.reset()

    },error=>{})
  }


  public getAllItems(){
    this.http.getItem().subscribe(res=>{
      this.items=res;
      console.log(res)
    })
  }


  public edit(item){
    console.log(item)
    let data={
      id:item._id,
    }
    this.itemTemp=data;
    this.todoForm.controls.name.setValue(item.name);
    this.showUpdate=true;
  }
  public update(){
    console.log(this.itemTemp)
    this.itemTemp['name']=this.todoForm.get('name').value;
    console.log(this.itemTemp)

    this.http.updateItem(this.itemTemp).subscribe(res=>{
      this.showUpdate=false
      this.getAllItems()
      this.todoForm.reset()

    },error=>{
      this.showUpdate=false;
      this.getAllItems()

    })
  }

  public delete(id){

    this.http.deleteItem(id).subscribe(res=>{
      this.getAllItems()

    },error=>{})
  }

}
