import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DropDownListComponent } from './components/drop-down-list/drop-down-list.component';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { ReusableDdlComponent } from './components/reusable-ddl/reusable-ddl.component';

@NgModule({
  declarations: [
    AppComponent,
    DropDownListComponent,
    MultiSelectComponent,
    ReusableDdlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
