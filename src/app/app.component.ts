import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IddlOptions, Iitems } from './Models/iddl-options';
import { ReusableDdlComponent } from './components/reusable-ddl/reusable-ddl.component';
//import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // constructor(private itemService: ItemsService) { }
  @ViewChild('dropList') dropListRef!: ReusableDdlComponent;

  title = 'third-task';
  inputType: string = 'radio'
  selectedData: any = ''
  //options: any[] = [];
  loading = false;
  validators: any;
  options: any[] = [
    { id: 0, title: 'Computer Science', code: 'Cs' },
    { id: 1, title: 'Design', code: 'DS' },
    { id: 3, title: 'User Interface Designes', code: 'UI' }, { id: 3, title: 'User Interface Designes', code: 'UI' }, { id: 3, title: 'User Interface Designes', code: 'UI' }, { id: 3, title: 'User Interface Designes', code: 'UI' },]

  // options: any[] = [
  //   'Computer Science', 'Design', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs'
  // ]


  ddlconfig: IddlOptions = {
    isMultiValued: false,
    isResettable: false,
    isSearchable: false,
    defaultValue:'MAIN FIELD',
    uniqueKey: 'id',
    showKey: 'title',
    searchKey: 'code',
    // baseUrl: 'http://localhost:4000/api/v1/items',
    limit: 10,
    page: 1,
    validators: {
      function: (array: any): any => {
        if (this.ddlconfig.isMultiValued) {
          if (array.length === 0) {
            return 'This field is required';
          } else if (array.length < 3) {
            return 'You must select at least 3 options';
          } else {
            return undefined; 
          }
        } else {
          if (!array || array.length === 0) {
            return 'You must select an option';
          } else {
            return undefined;
          }
        }
      
      }
    }
  }

  defualtSelectedValues: any[] = [
    { id: 0, title: 'Computer Science', code: 'Cs' },
    { id: 1, title: 'Design', code: 'DS' },
    { id: 3, title: 'User Interface Designes', code: 'UI' },

  ]

  toSelect = [
    { id: 3, title: 'User Interface Designes', code: 'UI' },
    { id: 4, title: 'testing', code: 'test' },
  ]


  selectVal() {
    const ddlComponent = this.dropListRef
    const ddlComponentInstance = ddlComponent as any;
    ddlComponentInstance.setSelectItems(this.toSelect)
    console.log("ddlComponentInstance", ddlComponentInstance)

  }

  getSelectedData(e: string) {
    this.selectedData = e
  }
}
