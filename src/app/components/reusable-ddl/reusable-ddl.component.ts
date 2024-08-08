import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IddlOptions } from 'src/app/Models/iddl-options';

@Component({
  selector: 'app-reusable-ddl',
  templateUrl: './reusable-ddl.component.html',
  styleUrls: ['./reusable-ddl.component.css']
})
export class ReusableDdlComponent  {
  selectedValues: Set<string> = new Set();
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
      return this.selectedValues.has(option);
    }
  }

  getSelectedValue(option: string) {
    if (!this.ddlconfigOptions.isMultiValued) {
      this.selectedVal = option;
      this.selectionEvent.emit(this.selectedVal);
    } else {
      if (this.selectedValues.has(option)) {
        this.selectedValues.delete(option);
      } else {
        this.selectedValues.add(option);
      }
      this.selectionEvent.emit(Array.from(this.selectedValues));
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
