import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login.component";
import {MessagesComponent} from "./messages.component";
import {MessageComponent} from "./message.component";
import {SignUpComponent} from './signup.component';
import {NewMessageComponent} from './new-message.component';
import {AuthGuard} from './auth-guard.service';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'messages/new',
        component: NewMessageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'message/:id',
        component: MessageComponent,
        canActivate: [AuthGuard]
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