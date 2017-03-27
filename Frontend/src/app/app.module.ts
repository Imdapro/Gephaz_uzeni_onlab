import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login.component";
import {MessagesComponent} from "./messages.component";
import {MessageService} from "./message.service";
import {MessageComponent} from "./message.component";

@NgModule({
  imports: [
      BrowserModule,
      AppRoutingModule
  ],

   providers: [
       MessageService
   ],

  declarations: [
      AppComponent,
      LoginComponent,
      MessagesComponent,
      MessageComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
