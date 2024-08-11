import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IddlOptions, Iitems } from 'src/app/Models/iddl-options';

@Component({
  selector: 'app-reusable-ddl',
  templateUrl: './reusable-ddl.component.html',
  styleUrls: ['./reusable-ddl.component.css']
})
export class ReusableDdlComponent implements OnInit {
  selectedValues: Iitems[] | string[] = [];

  @Input() options: Iitems[] | string[] = [];
  @Input() inputType: string = '';
  @Input() ddlconfigOptions: IddlOptions = {
    isMultiValued: false,
    items: []
  };

  @Output() selectionEvent = new EventEmitter()

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  ngOnInit() {
    if (this.inputType === 'string') {
      this.selectedValues = [] as string[];
    } else {
      this.selectedValues = [] as Iitems[];
    }
  }
  isSelected(option: Iitems | string): boolean {
    if (typeof option === 'string') {
      // Handle case where `option` is a string
      // Check if `selectedValues` contains strings
      if (this.isStringArray(this.selectedValues)) {
        return (this.selectedValues as string[]).includes(option);
      }
    } else {
      // Handle case where `option` is an `Iitems` object
      // Check if `selectedValues` contains `Iitems`
      if (this.isItemsArray(this.selectedValues)) {
        return (this.selectedValues as Iitems[]).some(selectedOption => selectedOption.id === option.id);
      }
    }
    return false;
  }

  isItemsArray(array: any[]): array is Iitems[] {
    return array.length > 0 && typeof (array[0] as Iitems) == 'object';
  }
  getItemName(option: Iitems | string) {
    return typeof option === 'string' ? option : option.name;
  }



  selectValues(option: Iitems | string) {
    if (typeof option === 'string') {
      // Handle string options
      if (this.isStringArray(this.selectedValues)) {
        const optionIndex = this.selectedValues.indexOf(option);
        if (optionIndex > -1) {
          this.selectedValues.splice(optionIndex, 1);
        } else if (this.ddlconfigOptions.isMultiValued || this.selectedValues.length === 0) {
          this.selectedValues.push(option);
        }
      } else {
        console.error('Type mismatch: selectedValues should be string[].');
      }
    } else {
      // Handle Iitems options
      if (this.isItemsArray(this.selectedValues)) {
        const optionIndex = this.selectedValues.findIndex(selectedOption => selectedOption.id === option.id);
        if (optionIndex > -1) {
          this.selectedValues.splice(optionIndex, 1);
        } else if (this.ddlconfigOptions.isMultiValued || this.selectedValues.length === 0) {
          this.selectedValues.push(option);
        }
      } else {
        console.error('Type mismatch: selectedValues should be Iitems[].');
      }
    }
  

    this.selectionEvent.emit(this.selectedValues);
  }



  displaySelectedVals() {
    return this.selectedValues.map(value => (value as Iitems).name).join(', ') || 'Main Field';
  }


  isStringArray(array: any[]): array is string[] {
    console.log("iSstringArray",typeof array[0] === 'string' && array.length > 0)
    return typeof array[0] === 'string' && array.length > 0;
  }


}
