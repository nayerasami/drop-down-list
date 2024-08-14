import { Component } from '@angular/core';
import { IddlOptions, Iitems } from './Models/iddl-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'third-task';
  inputType: string = 'radio'
  selectedData: any = ''
  // options: any[] = [
  //   { id: 0, title: 'Computer Science', code: 'Cs' },
  //   { id: 1, title: 'Design', code: 'DS' },
  //   { id: 3, title: 'User Interface Designes', code: 'UI' },
  //   { id: 3, title: 'User Interface Designes',code: 'UI' },
  //   { id: 3, title: 'User Interface Designes' ,code: 'UI'},
  // ]

  options: any[] = [
    'Computer Science', 'Design', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs'
  ]


  ddlconfig: IddlOptions = {
    isMultiValued: true,
    isResettable: true,
    isSearchabl: true,
    uniqueKey: 'id',
    showKey: 'title',
    searchKey: 'code'
  }

  getSelectedData(e: string) {
    this.selectedData = e
  }
}
