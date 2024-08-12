import { Component } from '@angular/core';
import { IddlOptions, Iitems } from './Models/iddl-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'third-task';
  inputType: string = 'radio'
  selectedData: string | string[] = ''
  // options: Iitems[] = [
  //   { id: 1, name: 'Computer Science' },
  //   { id: 2, name: 'Design' },
  //   { id: 3, name: 'User Interface Designes' }
  // ]
  options: string[] = [
    'Computer Science','Design' ,'User Interface Designs'
  ]


  ddlconfig: IddlOptions = {
    isMultiValued: true,
    isResettable: true,
    isSearchabl: true,
    items: this.options

  }

  getSelectedData(e: string) {
    this.selectedData = e
  }
}
