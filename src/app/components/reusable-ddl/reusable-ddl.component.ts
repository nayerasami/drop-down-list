import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IddlOptions } from 'src/app/Models/iddl-options';

@Component({
  selector: 'app-reusable-ddl',
  templateUrl: './reusable-ddl.component.html',
  styleUrls: ['./reusable-ddl.component.css']
})
export class ReusableDdlComponent  {
  selectedValues: string[] = [];
  selectedVal: string = ''

  @Input() options: any[] = [];
  @Input() inputType: string = '';
  @Input() ddlconfigOptions: IddlOptions = {
    isMultiValued: false,
    items:[]
  };

  @Output() selectionEvent = new EventEmitter()


  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  isSelected(option: string): boolean {
    if (!this.ddlconfigOptions.isMultiValued) {
      return this.selectedVal === option
    } else {    
        console.log(this.selectedValues)

      return this.selectedValues.includes(option);
    }
  }

  getSelectedValue(option: string) {
    if (!this.ddlconfigOptions.isMultiValued) {
      this.selectedVal = option;
      this.selectionEvent.emit(this.selectedVal);
      console.log(this.selectedVal)
    } else {
      if (this.selectedValues.includes(option)) {
        // this.selectedValues.delete(option);
        this.selectedValues.splice(-1,0)
        console.log(this.selectedValues)
        
      } else {
        this.selectedValues.push(option);
      }
      this.selectionEvent.emit(this.selectedValues);
    }
  }


  displaySelectedVals() {

    if (!this.ddlconfigOptions.isMultiValued) {
      return this.selectedVal || ''
    } else {
      return Array.from(this.selectedValues).join(', ');
    }



  }





}
