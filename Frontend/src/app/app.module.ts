import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login.component";
import {MessagesComponent} from "./messages.component";

@NgModule({
  imports: [
      BrowserModule,
      AppRoutingModule
  ],
  declarations: [
      AppComponent,
      LoginComponent,
      MessagesComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
