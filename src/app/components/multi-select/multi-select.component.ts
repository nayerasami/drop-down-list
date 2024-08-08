import { Component } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent {
  selectedValues: { [key: string]: boolean } = {};
  options: string[] = [
    'Computer Science', 'Design', 'User Interface Designes'
  ]
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.selectedValues)
  }

  getSelectedValues(): any {
    const selectedOptions = this.options.filter(option => this.selectedValues[option]);
    return selectedOptions.join(', ');

  }
}
