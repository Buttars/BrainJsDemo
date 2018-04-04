import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
