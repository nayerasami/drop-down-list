import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IddlOptions } from './Models/iddl-options';
import { ReusableDdlComponent } from './components/reusable-ddl/reusable-ddl.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // constructor(private itemService: ItemsService) { }
  @ViewChild('dropList') dropListRef!: ReusableDdlComponent;
  formGroupName: FormGroup;
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

  constructor(){
    this.formGroupName = new FormGroup({})

  }


  ngOnInit(): void {
    this.DDLsOptions.forEach((ddl: any) => {
    
      this.formGroupName.setControl(ddl.ddlconfigOptions.name, new FormControl(''));
      console.log(this.formGroupName,"form group[")
    });

   

  }




  // ddlconfig: IddlOptions = {
  //   optionsArr: this.options,
  //   label: 'select your major',
  //   name: 'major',
  //   defaultTitle: 'select major',
  //   isMultiValued: false,
  //   isResettable: false,
  //   isSearchable: false,
  //   uniqueKey: 'id',
  //   showKey: 'title',
  //   searchKey: 'code',
  //   // baseUrl: 'http://localhost:4000/api/v1/items',
  //   limit: 10,
  //   page: 1,
  //   multiSelectValidators: {
  //     validators: [
  //       Validators.minLength(3),
  //       Validators.required
  //     ],
  //     errorMessages: {
  //       required: 'This field is required',
  //       minlength: 'You must select at least 3'
  //     }
  //   },
  //   singleSelectValidators: {
  //     validators: [
  //       Validators.required
  //     ],
  //     errorMessages: {
  //       required: 'This field is required',
  //     }
  //   }
  // }


  genderOptionsArr: any[] = ['Male', 'Female']
  maritalStatusOptionsArr: any[] = ['Married', 'Single', 'Divorced', 'Widower']

  genderDdlOptions: IddlOptions = {
    optionsArr: this.genderOptionsArr,
    ddlconfigOptions: {
      label: 'Gender',
      name: 'gender',
      defaultTitle: 'Select your gender',
      isMultiValued: false,
      isResettable: false,
      isSearchable: false,
      uniqueKey: 'id',
      showKey: 'title',
      searchKey: 'code',
      singleSelectValidators: {
        validators: [Validators.required],
        errorMessages: { required: 'You must select your gender' }
      }
    }
  };

  maritalStatusDdlOptions: IddlOptions = {
    optionsArr: this.maritalStatusOptionsArr,
    ddlconfigOptions: {
      label: 'Marital Status',
      name: 'maritalStatus',
      defaultTitle: 'Select your marital status',
      isMultiValued: false,
      isResettable: false,
      isSearchable: false,
      uniqueKey: 'id',
      showKey: 'title',
      searchKey: 'code',
      singleSelectValidators: {
        validators: [Validators.required],
        errorMessages: { required: 'You must select your marital status' }
      }
    }
  };

  DDLsOptions: IddlOptions[] = [
    this.genderDdlOptions,
    this.maritalStatusDdlOptions
  ];




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
    // if (this.ddlconfig.isMultiValued) {
    const ddlComponent = this.dropListRef
    const ddlComponentInstance = ddlComponent as any;
    ddlComponentInstance.setSelectItems(this.toSelect)
    console.log("ddlComponentInstance", ddlComponentInstance)

    //  }
  }

  getSelectedData(e: string) {
    this.selectedData = e
    console.log(this.selectedData, "selected Data")
  }
}
