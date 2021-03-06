import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import { AlertModule, BsDropdownModule } from 'ng2-bootstrap';

import { AppComponent }  from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login.component";
import {MessagesComponent} from "./messages.component";
import {MessageService} from "./message.service";
import {MessageComponent} from "./message.component";
import {authHttpServiceFactory, AuthModule} from './auth.module';
import {WebSocketService} from './websocket.service';
import {AuthenticationService} from './auth.service';
import {SignUpComponent} from './signup.component';
import {AuthHttp} from 'angular2-jwt';
import {NewMessageComponent} from './new-message.component';
import {MessagesService} from './ng2-messages/ng2-messages.service';
import {MessagesComponent as MsgComponent} from './ng2-messages/ng2-messages.component';
import {EngineRoomMessage} from './engine-room-message.component';
import {AuthGuard} from './auth-guard.service';


@NgModule({
  imports: [
      BrowserModule,
      AppRoutingModule,
      AuthModule,
      FormsModule,
      HttpModule
  ],

   providers: [
       MessageService,
       WebSocketService,
       AuthenticationService,
       AuthGuard,
       MessagesService,
       {
           provide: AuthHttp,
           useFactory: authHttpServiceFactory,
           deps: [Http, RequestOptions]
       }
   ],

  declarations: [
      AppComponent,
      LoginComponent,
      MessagesComponent,
      MessageComponent,
      SignUpComponent,
      NewMessageComponent,
      MsgComponent,
      EngineRoomMessage
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
