import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IddlOptions, Iitems } from './Models/iddl-options';
import { ReusableDdlComponent } from './components/reusable-ddl/reusable-ddl.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // constructor(private itemService: ItemsService) { }
  @ViewChild('dropList') dropListRef!: ReusableDdlComponent;
  formEl: any;
  title = 'third-task';
  inputType: string = 'radio'
  selectedData: any = ''
  //options: any[] = [];
  loading = false;
  validators: any;
  options: any[] = [
    { id: 0, title: 'Computer Science', code: 'Cs' },
    { id: 1, title: 'Design', code: 'DS' },
    { id: 3, title: 'User Interface Designes', code: 'UI' },]

  // options: any[] = [
  //   'Computer Science', 'Design', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs'
  // ]





  ddlconfig: IddlOptions = {
    optionsArr: this.options,
    label: 'select your major',
    name: 'major',
    defaultTitle: 'select major',
    isMultiValued: false,
    isResettable: false,
    isSearchable: false,
    uniqueKey: 'id',
    showKey: 'title',
    searchKey: 'code',
    // baseUrl: 'http://localhost:4000/api/v1/items',
    limit: 10,
    page: 1,
    multiSelectValidators: {
      validators: [
        Validators.minLength(3),
        Validators.required
      ],
      errorMessages: {
        required: 'This field is required',
        minlength: 'You must select at least 3'
      }
    },
    singleSelectValidators: {
      validators: [
        Validators.required
      ],
      errorMessages: {
        required: 'This field is required',
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
    if (this.ddlconfig.isMultiValued) {
      const ddlComponent = this.dropListRef
      const ddlComponentInstance = ddlComponent as any;
      ddlComponentInstance.setSelectItems(this.toSelect)
      console.log("ddlComponentInstance", ddlComponentInstance)

    }
  }

  getSelectedData(e: string) {
    this.selectedData = e
    console.log(this.selectedData, "selected Data")
  }
}
