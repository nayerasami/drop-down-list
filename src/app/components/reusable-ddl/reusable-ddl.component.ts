import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IddlOptions, Iitems } from 'src/app/Models/iddl-options';

@Component({
  selector: 'app-reusable-ddl',
  templateUrl: './reusable-ddl.component.html',
  styleUrls: ['./reusable-ddl.component.css']
})
export class ReusableDdlComponent implements OnInit {
  selectedValues:(string | Iitems)[] = [];
  searchQuery = ''

  isStringArray =false;
  originalOptions: (string | Iitems)[]= [];
  @Input() options: Iitems[] | string[] = [];
  @Input() inputType: string = '';
  @Input() ddlconfigOptions: IddlOptions = {
    isMultiValued: false,
    items: []
  };
  dropdownOpen = false;
  @Output() selectionEvent = new EventEmitter()

  ngOnInit(): void {
    this.originalOptions = [...this.options]
    if(typeof this.options[0] ==='string'){
      this.isStringArray =true;
    }
    else{
      this.isStringArray =false
    }

  }
 

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  isSelected(option: Iitems |string): boolean {
    console.log("type of options",typeof option)
    if(typeof option ==='string'){
      return this.selectedValues.some(seletedVal => seletedVal ==option)
    }else{
    if (!this.ddlconfigOptions.isMultiValued) {
      return this.selectedValues.includes(option)
    } else {
      const index = this.selectedValues.findIndex(selectedOption => (selectedOption as Iitems).id == option.id)
      return index !==-1

    }
  }
  }

  selectValues(option:Iitems |string) {

    const optionIndex = this.selectedValues.indexOf(option);

    if (optionIndex > -1) {
      this.selectedValues.splice(optionIndex, 1);
    } else {
      if (!this.ddlconfigOptions.isMultiValued) {
        this.selectedValues = [option];
      } else {
        this.selectedValues.push(option);
      }
    }

    this.selectionEvent.emit(this.selectedValues);
    console.log("selection result",this.selectedValues)
  }


  displaySelectedVals() {
    console.log("display selected vals", this.selectedValues)
    if(typeof this.selectedValues[0] ==='string'){
      return this.selectedValues.join(',') || 'Main Field'
    }else{
      return this.selectedValues.map(value => (value as Iitems).name).join(', ') || 'Main Field';

    }
  }

  getFilteredValues(): (string | Iitems)[] {
    if (this.searchQuery.trim() === '') {
      console.log(this.originalOptions)
      return this.originalOptions
    } else {
      const query = this.searchQuery.toLowerCase()

      if(typeof this.originalOptions[0] ==='string'){
        const filteredArray = this.originalOptions.filter(option => (option as string).toLowerCase().includes(query))
        console.log("filteredArray", filteredArray)
        return filteredArray;
      }else{
      const filteredArray = this.originalOptions.filter(optionName => (optionName as Iitems).name.toLowerCase().includes(query))
      console.log("filteredArray", filteredArray)
      return filteredArray;
    }
    }
  }

  selectAll() {
    if (this.ddlconfigOptions.isMultiValued) {
      this.selectedValues = [...this.originalOptions]
      this.selectionEvent.emit(this.selectedValues);
    }
  }

  reset() {
    this.selectedValues = []
    this.searchQuery = ''
    this.getFilteredValues()
  }

  getOptionId(option :Iitems |string){
    return typeof option === 'string' ? option : option.id;
  }

  getOptionName(option :Iitems |string){
    return typeof option === 'string' ? option : option.name;
  }

  
  // checkOptionsType (){
  //   if(typeof this.options[0] ==='string'){
  //     this.isStringArray =true;
  //   }
  //   else{
  //     this.isStringArray =false
  //   }
  // }

}
