import { Component } from '@angular/core';
import { IddlOptions } from './Models/iddl-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'third-task';
  inputType: string = 'radio'
  selectedData: string | string[] = ''
  options: any[] = [
    {id:1,name:'Computer Science'},
    {id:2,name:'Design'},
    {id:3,name:'User Interface Designes'}
  ]

  ddlconfig :IddlOptions ={
    isMultiValued:false,
    isResettable:true,
    isSearchabl:true,
    items:this.options
   
  }

  getSelectedData(e: string) {
    this.selectedData = e
  }
}
