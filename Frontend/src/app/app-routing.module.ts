import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login.component";
import {MessagesComponent} from "./messages.component";
import {MessageComponent} from "./message.component";
import {SignUpComponent} from './signup.component';
import {NewMessageComponent} from './new-message.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'messages/new',
        component: NewMessageComponent
    },
    {
        path: 'messages',
        component: MessagesComponent
    },
    {
        path: 'message/:id',
        component: MessageComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}