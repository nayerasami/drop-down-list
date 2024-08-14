import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IddlOptions, Iitems } from 'src/app/Models/iddl-options';

@Component({
  selector: 'app-reusable-ddl',
  templateUrl: './reusable-ddl.component.html',
  styleUrls: ['./reusable-ddl.component.css']
})
export class ReusableDdlComponent implements OnInit {
  selectedValues: any = [];
  searchQuery = ''
  isStringArray = false;
  originalOptions: any = [];
  @Input() options: any = [];
  @Input() inputType: string = '';
  @Input() ddlconfigOptions: IddlOptions = {
    isMultiValued: false,
    // items: [],
    uniqueKey: 'id'
  };

  dropdownOpen = false;
  @Output() selectionEvent = new EventEmitter()

  ngOnInit(): void {
    console.log(this.getUniqueArray(this.options))
    this.originalOptions = this.getUniqueArray(this.options)
    // this.originalOptions = [...this.options]
    console.log("filered original options", this.originalOptions)
    if (typeof this.options[0] == 'string') {
      this.isStringArray = true
    }
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  isSelected(option: any): any {

    const uniqueKey = this.ddlconfigOptions.uniqueKey || 'id'
    const value = typeof option === 'object' ? option[uniqueKey] : option;
    //console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", value)
      const index = this.selectedValues.findIndex((selectedOption: any) => {
        const selectedValue = typeof selectedOption === 'object' ? selectedOption[uniqueKey] : selectedOption;
        return selectedValue === value;
      });
    console.log(index,"index isselceted")
    return index !==-1
  }



  selectValues(option: any) {
    const uniqueKey = this.ddlconfigOptions.uniqueKey || 'id'
    const value = option[uniqueKey] ? option[uniqueKey] : option
    const optionIndex = this.selectedValues.indexOf(value)
    if (optionIndex > -1) {
      this.selectedValues.splice(optionIndex, 1);
    } else {
      if (!this.ddlconfigOptions.isMultiValued) {
        this.selectedValues = [value];
      } else {
        this.selectedValues.push(value);
      }
    }
    this.selectionEvent.emit(this.selectedValues);
    console.log("selection result", this.selectedValues)
  }


  // displaySelectedVals() {
  //   console.log("display selected vals", this.selectedValues)
  //   if (typeof this.selectedValues[0] === 'string') {
  //     return this.selectedValues.join(',') || 'Main Field'
  //   } else {
  //     return this.selectedValues.map(value => (value as Iitems).name).join(', ') || 'Main Field';

  //   }
  // }


  getFilteredValues() {


    // const uniqueKey = this.ddlconfigOptions.uniqueKey || 'id'
    // const value = option[uniqueKey] ? option[uniqueKey] : option

    if (this.searchQuery.trim() === '') {
      this.originalOptions = this.getUniqueArray(this.options)
    } else {
      const query = this.searchQuery.toLowerCase()
      if (typeof this.originalOptions[0] === 'string') {
        const selectedArray = this.originalOptions as string[]
        this.originalOptions = selectedArray.filter(option => (option as string).toLowerCase().includes(query));
      } else {
        const selectedArray = this.originalOptions as Iitems[]
        this.originalOptions = selectedArray.filter(optionName => (optionName as Iitems).name.toLowerCase().includes(query));

      }
    }
  }

  selectAll() {
    if (this.ddlconfigOptions.isMultiValued) {
     // this.selectedValues = [...this.originalOptions]
      this.selectedValues = [...this.getUniqueArray(this.originalOptions)]
     // console.log("sssss", selectedArray)
      this.selectionEvent.emit(this.selectedValues);
    }
  }

  reset() {
    this.selectedValues = []
    this.searchQuery = ''
  }

  private getUniqueArray(array: any): any[] {
    const uniqueSet = new Set();
    const uniqueArray: string[] | Iitems[] = [];

    const uniqueKey = this.ddlconfigOptions.uniqueKey || 'id'
    for (const item of array) {
      const value = item[uniqueKey] ? item[uniqueKey] : item
      if (!uniqueSet.has(value)) {
        uniqueSet.add(value)
        uniqueArray.push(item)
      }

    }

    console.log("uniqqqq", uniqueArray)
    return uniqueArray;
  }




}
