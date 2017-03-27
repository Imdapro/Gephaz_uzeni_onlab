import {Message} from "./Message";

export class  MessageService {
    private messages: Message[] = [
    ];

    constructor(){
        this.messages.push(new Message(1, "Új regisztráció", "Teszt Elek", "2017-01-02", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"));
        this.messages.push(new Message(2, "Meghívó", "Tóth Zoltán", "2015-11-23", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"));
        // TODO: lekérni a szerverről az üzeneteket
    }

    getMessages(){
        return this.messages;
    }

    getMessage(id: number) {
        for(var i = 0, iLen = this.messages.length; i < iLen; i++) {
            if(this.messages[i].id == id)
                return this.messages[i];
        }
        return null;
    }
}