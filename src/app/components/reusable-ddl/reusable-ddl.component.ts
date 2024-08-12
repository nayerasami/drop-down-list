import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IddlOptions, Iitems } from 'src/app/Models/iddl-options';

@Component({
  selector: 'app-reusable-ddl',
  templateUrl: './reusable-ddl.component.html',
  styleUrls: ['./reusable-ddl.component.css']
})
export class ReusableDdlComponent implements OnInit {
  selectedValues: (string | Iitems)[] = [];
  searchQuery = ''
  isStringArray = false;
  originalOptions: any[] = [];
  @Input() options: Iitems[] | string[] = [];
  @Input() inputType: string = '';
  @Input() ddlconfigOptions: IddlOptions = {
    isMultiValued: false,
    items: [],
    uniqueKey: 'id'
  };

  dropdownOpen = false;
  @Output() selectionEvent = new EventEmitter()

  ngOnInit(): void {
console.log(this.ddlconfigOptions)
    this.originalOptions = [...this.getUniqueArray(this.options)]
    console.log("filered original options", this.originalOptions)
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  isSelected(option: Iitems | string): boolean {
    console.log("type of options", typeof option)
    console.log("unique keyyyyyyy", this.getUniqueKey(option))

    if (typeof option === 'string') {
      const index = this.selectedValues.findIndex(seletedVal => seletedVal == option)
      return index !== -1
    } else {
      const key = this.getUniqueKey(option) as keyof Iitems
      console.log("key form isslected fun", key)

      const index = this.selectedValues.findIndex(selectedOption => {
        return typeof selectedOption === 'object' && selectedOption !== null && key in selectedOption && selectedOption[key] === option[key];
      })
      console.log("indeeexxx", index)
      return index !== -1
    }
  }

  selectValues(option: Iitems | string) {

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

  getFilteredValues(): any {
    if (this.searchQuery.trim() === '') {
      console.log(this.originalOptions)
      return this.originalOptions
    } else {
      const query = this.searchQuery.toLowerCase()

      if (typeof this.originalOptions[0] === 'string') {
        return this.originalOptions.filter(option => (option as string).toLowerCase().includes(query));
      } else {
        return this.originalOptions.filter(optionName => (optionName as Iitems).name.toLowerCase().includes(query));
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

  getOptionId(option: Iitems | string) {
    return typeof option === 'string' ? option : option.id;

  }
  private getUniqueKey(option: Iitems | string) {
    if (typeof option === 'string') {
      return option;
    } else {
      const key = this.ddlconfigOptions.uniqueKey as keyof Iitems || 'id';
      console.log("kkkkkkkkkk", key)
      return option[key] || option.id;  // Fallback logic
    }
  }


  getOptionName(option: Iitems | string) {
    return typeof option === 'string' ? option : option.name;
  }

  private getUniqueArray(array: (string | Iitems)[]) {
    if (array.length === 0) return [];

    if (typeof array[0] === 'string') {
      return array.filter((item, index, self) => self.indexOf(item) === index);
    }

    const uniqueMap = new Map<any, Iitems>();

    for (const item of array) {
      if (typeof item === 'object' && item !== null) {
        const uniqueKey = this.getUniqueKey(item);
        console.log("uniqueKey from getuniqueArray",uniqueKey)
        if (!uniqueMap.has(uniqueKey)) {
          uniqueMap.set(uniqueKey, item);
          console.log("unique mpapp" , uniqueMap)
        }
      }
    }

    console.log("uniqueMap.values",uniqueMap.values())
    return Array.from(uniqueMap.values());

  }

}
