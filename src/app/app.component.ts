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
  options: any[] = [
    { id: 0, name: 'Computer Science' },
    { id: 1, name: 'Design' },
    { id: 3, name: 'User Interface Designes' },
    { id: 3, name: 'User Interface Designes' },
    { id: 3, name: 'User Interface Designes' },

  ]

  // options: any[] = [
  //   'Computer Science', 'Design', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs'
  // ]


  ddlconfig: IddlOptions = {
    isMultiValued: true,
    isResettable: true,
    isSearchabl: true,
    // items: this.options,
    uniqueKey: 'id'
  }

  getSelectedData(e: string) {
    this.selectedData = e
  }
}
