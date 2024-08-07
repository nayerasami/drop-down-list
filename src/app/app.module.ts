import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DropDownListComponent } from './components/drop-down-list/drop-down-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DropDownListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
