import { Component, OnInit } from '@angular/core';
import { IddlOptions, Iitems } from './Models/iddl-options';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private itemService: ItemsService) { }


  title = 'third-task';
  inputType: string = 'radio'
  selectedData: any = ''
  page = 1;
  limit = 10;
  options: any[] = [];
  loading = false;

  // options: any[] = [
  //   { id: 0, title: 'Computer Science', code: 'Cs' },
  //   { id: 1, title: 'Design', code: 'DS' },
  //   { id: 3, title: 'User Interface Designes', code: 'UI' },]

  // options: any[] = [
  //   'Computer Science', 'Design', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs', 'User Interface Designs'
  // ]


  ngOnInit(): void {
    this.loadItems()
    console.log("options", this.options)
  }

  loadItems() {
    this.itemService.getItems(this.page, this.limit).subscribe({
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



  ddlconfig: IddlOptions = {
    isMultiValued: true,
    isResettable: true,
    isSearchabl: true,
    uniqueKey: 'id',
    showKey: 'title',
    searchKey: 'code'
  }

  getSelectedData(e: string) {
    this.selectedData = e
  }
}
