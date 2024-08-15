import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IddlOptions, Iitems } from 'src/app/Models/iddl-options';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-reusable-ddl',
  templateUrl: './reusable-ddl.component.html',
  styleUrls: ['./reusable-ddl.component.css']
})
export class ReusableDdlComponent implements OnInit {
  selectedValues: any = [];
  searchQuery = ''
  uniqueKey: any;
  showKey: any;
  searchCode: any;
  apiEndPoint: any;
  page = 1;
  limit = 10;
  originalOptions: any = [];
  @Input() options: any = [];
  @Input() inputType: string = '';
  @Input() loading: boolean = false
  @Input() ddlconfigOptions: IddlOptions = {
    isMultiValued: false,
    // items: [],
    uniqueKey: 'id',
    baseUrl: ''
  };

  dropdownOpen = false;
  @Output() selectionEvent = new EventEmitter()
  @Output() loadMore = new EventEmitter()

  constructor(private itemService: ItemsService) { }

  ngOnInit(): void {
    this.showKey = this.ddlconfigOptions.showKey || 'title';
    this.uniqueKey = this.ddlconfigOptions.uniqueKey || 'id'
    this.searchCode = this.ddlconfigOptions.searchKey || 'code'
    this.apiEndPoint = this.ddlconfigOptions.baseUrl
    this.loadItems()
    this.originalOptions = this.getUniqueArray(this.options)

  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['options']) {
  //     console.log('Options updated in child:', this.options);
  //     this.originalOptions = this.getUniqueArray(this.options)
  //   }
  // }

  loadItems() {
    this.itemService.getItems(this.apiEndPoint, this.page, this.limit).subscribe({
      next: (response: any) => {
        console.log(response.data.items, "resss")
        const items = response.data.items
        this.options = [...this.options, ...items]
        console.log(this.options, "thisss")
        this.loading = false;
      },
      error: error => {
        console.error(error, "error")
      }
    })
  }
  onScroll(event: any) {

    console.log(event.target)
    const element = event.target;

    console.log(element.scrollHeight)
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loading = true
      this.loadMoreItems()
    }

  }

  loadMoreItems() {
    this.loadMore.emit()
  }



  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  isSelected(option: any): any {
    const value = typeof option === 'object' ? option[this.uniqueKey] : option;
    const index = this.selectedValues.findIndex((selectedOption: any) => {
      const selectedValue = typeof selectedOption === 'object' ? selectedOption[this.uniqueKey] : selectedOption;
      return selectedValue === value;
    });
    return index !== -1
  }

  selectValues(option: any) {
    //const value = option[this.uniqueKey] ? option[this.uniqueKey] : option
    const optionIndex = this.selectedValues.indexOf(option)
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
  }


  displaySelectedVals() {
    return this.selectedValues
      .map((value: any) => {
        const val = value[this.showKey] ? value[this.showKey] : value
        return val;
      })
      .join(', ') || 'Main Field';

  }


  searchValues() {
    if (this.searchQuery.trim() == '') {
      this.originalOptions = this.getUniqueArray(this.options)
    } else {
      const query = this.searchQuery.toLowerCase()
      const selectedArray = this.getUniqueArray(this.options);
      this.originalOptions = selectedArray.filter((option: any) => {
        const isShowKey = option[this.showKey] ? option[this.showKey] : option;
        const value = option[this.searchCode] ? option[this.searchCode] : isShowKey
        return value.toString().toLowerCase().includes(query)
      })

    }
  }

  selectAll() {
    if (this.ddlconfigOptions.isMultiValued) {
      this.selectedValues = [...this.getUniqueArray(this.originalOptions)]
      this.selectionEvent.emit(this.selectedValues);
    }
  }

  reset() {
    this.selectedValues = []
    this.originalOptions = this.getUniqueArray(this.options)
    this.searchQuery = ''
    // this.searchValues()
  }

  private getUniqueArray(array: any): any[] {
    const uniqueSet = new Set();
    const uniqueArray: any[] = [];
    for (const item of array) {
      const value = item[this.uniqueKey] ? item[this.uniqueKey] : item
      if (!uniqueSet.has(value)) {
        uniqueSet.add(value)
        uniqueArray.push(item)
      }
    }
    return uniqueArray;
  }




}
