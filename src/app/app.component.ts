import { Component, OnInit } from '@angular/core';
import { IddlOptions, Iitems } from './Models/iddl-options';
//import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

 // constructor(private itemService: ItemsService) { }


  title = 'third-task';
  inputType: string = 'radio'
  selectedData: any = ''
 
  //options: any[] = [];
  loading = false;

  // options: any[] = [
  //   { id: 0, title: 'Computer Science', code: 'Cs' },
  //   { id: 1, title: 'Design', code: 'DS' },
  //   { id: 3, title: 'User Interface Designes', code: 'UI' },]

  // options: any[] = [
  //   'Computer Science', 'Design', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs'
  // ]


  ddlconfig: IddlOptions = {
    isMultiValued: true,
    isResettable: true,
    isSearchabl: true,
    uniqueKey: 'id',
    showKey: 'title',
    searchKey: 'code',
    baseUrl:'http://localhost:4000/api/v1/items',
    limit:10,
    page:1
  }

  defualtSelectedValues :any[] =[
    { id: 0, title: 'Computer Science', code: 'Cs' },
    { id: 1, title: 'Design', code: 'DS' },
    { id: 3, title: 'User Interface Designes', code: 'UI' },

  ]
  getSelectedData(e: string) {
    this.selectedData = e
  }
}
