import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IddlOptions, Iitems } from 'src/app/Models/iddl-options';

@Component({
  selector: 'app-reusable-ddl',
  templateUrl: './reusable-ddl.component.html',
  styleUrls: ['./reusable-ddl.component.css']
})
export class ReusableDdlComponent implements OnInit {
  selectedValues: string[] | Iitems[] = [];
  searchQuery = ''
  isStringArray = false;
  originalOptions: any = [];
  @Input() options: Iitems[] | string[] = [];
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
    const value = option[uniqueKey] ? option[uniqueKey] : option
    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", value)
    // if (typeof option === 'string') {

    //   console.log("unique key from string isSlected case ", key)
    //   const index = this.selectedValues.findIndex(seletedVal => seletedVal === key)
    //   return index !== -1
    // } else {
    //   const index = this.selectedValues.findIndex(selectedOption => {
    //     return (selectedOption as Iitems)[key as keyof Iitems] === option[key as keyof Iitems];
    //   })
    //   //   console.log("indeeexxx", index)
    //   return index !== -1
    // }

    const index = this.selectedValues.findIndex(selectedOptions => selectedOptions[uniqueKey] === value)
    
    console.log("indexxxxx", index)
    return index !== -1
  }

  selectValues(option: any) {
    // const key = (typeof option === 'string' ? option : this.ddlconfigOptions.uniqueKey)
    // if (typeof option === 'string') {

    //   const selectedArr = this.selectedValues as string[]
    //   const optionIndex = selectedArr.indexOf(option)
    //  if (optionIndex > -1) {
    //     this.selectedValues.splice(optionIndex, 1);
    //   } else {
    //     if (!this.ddlconfigOptions.isMultiValued) {
    //       this.selectedValues = [option];
    //     } else {
    //       selectedArr.push(option);
    //     }
    //   } 
    // } else {
    //   const selectedArr = this.selectedValues as Iitems[]
    //   const optionIndex = selectedArr.findIndex(selectedOption => selectedOption[key as keyof Iitems] === option[key as keyof Iitems])
    //   if (optionIndex > -1) {
    //     this.selectedValues.splice(optionIndex, 1);
    //   } else {
    //     if (!this.ddlconfigOptions.isMultiValued) {
    //       this.selectedValues = [option];
    //     } else {
    //       selectedArr.push(option);
    //     }
    //   }

    // }

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


  displaySelectedVals() {
    console.log("display selected vals", this.selectedValues)
    if (typeof this.selectedValues[0] === 'string') {
      return this.selectedValues.join(',') || 'Main Field'
    } else {
      return this.selectedValues.map(value => (value as Iitems).name).join(', ') || 'Main Field';

    }
  }

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
     // if (typeof this.options[0] == 'string') {
        const selectedArray = this.originalOptions 
        this.selectedValues = [...selectedArray]
        console.log("sssss",selectedArray)
        this.selectionEvent.emit(this.selectedValues);
      // } else {
      //   const selectedArray = this.originalOptions as Iitems[]
      //   this.selectedValues = [...selectedArray]
      //   this.selectionEvent.emit(this.selectedValues);
      // }

    }
  }

  reset() {
    this.selectedValues = []
    this.searchQuery = ''
  }

  getOptionId(option: Iitems | string) {
    return typeof option === 'string' ? option : option.id;

  }

  getOptionName(option: Iitems | string) {
    return typeof option === 'string' ? option : option.name;
  }




  private getUniqueArray(array:any): any[] {
    const uniqueSet = new Set();
    const uniqueArray: string[] | Iitems[] = [];

    const uniqueKey = this.ddlconfigOptions.uniqueKey || 'id'
    for (const item of array) {
      const value =item[uniqueKey] ? item [uniqueKey] :item
      if(!uniqueSet.has(value)){
        uniqueSet.add(value)
        uniqueArray.push(item)
      }
      // if (typeof item === 'string') {
      //   const key = item
      //   if (!uniqueSet.has(key)) {
      //     uniqueSet.add(key);
      //     (uniqueArray as string[]).push(key);
      //   }
      // } else {
      //   const uniqueKey = item[this.ddlconfigOptions.uniqueKey as keyof Iitems];
      //   if (!uniqueSet.has(uniqueKey)) {
      //     uniqueSet.add(uniqueKey);
      //     (uniqueArray as Iitems[]).push(item);
      //   }
      // }
    }

    console.log("uniqqqq", uniqueArray)
    return uniqueArray;
  }




}
