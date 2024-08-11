import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IddlOptions, Iitems } from 'src/app/Models/iddl-options';

@Component({
  selector: 'app-reusable-ddl',
  templateUrl: './reusable-ddl.component.html',
  styleUrls: ['./reusable-ddl.component.css']
})
export class ReusableDdlComponent {
  selectedValues: { id: number, name: string }[] = [];

  @Input() options: Iitems[] = [];
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


  isSelected(option: Iitems): boolean {
    if (!this.ddlconfigOptions.isMultiValued) {
      return this.selectedValues.includes(option)
    } else {
      const index = this.selectedValues.some(selectedOption => selectedOption.id == option.id)
      return index

    }
  }

  selectValues(option: Iitems) {
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
    console.log(this.selectedValues)
  }


  displaySelectedVals() {
    console.log("display selected vals", this.selectedValues)
    return this.selectedValues.map(value => value.name).join(', ') || 'Main Field';
  }
  selectAll() {
    if (this.ddlconfigOptions.isMultiValued) {
      this.selectedValues = [...this.options]
      this.selectionEvent.emit(this.selectedValues);
    }
  }

  reset() {
    this.selectedValues = []
  }


}
