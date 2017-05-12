import {Component} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './Message';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Component({
    selector: 'engine-room-message',
    templateUrl: 'templates/engine-room-message.component.html'
})

export class EngineRoomMessage {
    public show: boolean;
    public message: Message;

    constructor(private msgService: MessageService) {
        this.show = false;
        this.message = new Message;
        this.manage();
    }

    /**
     * Elindítja a pollozást, ha kaptunk vissza üzenetet a MessageService-től, akkor egy felugró ablakben megjeleníti azt.
     */
    manage() {
        this.msgService.poll().subscribe(
            (msg) => {
                if (msg === null) {
                    return;
                }
                if (msg instanceof ErrorObservable) {
                    return;
                } else if (msg) {
                    this.showMessage(msg);
                }
                console.log('Sikeres lekérés!' + typeof msg);
            },
            e => {console.log('Lekérési hiba történt!'); this.manage(); });
    }

    /**
     * Beállítja a kapott paramétert az üzenetnek, és mgejeleníti az ablakot.
     * @param msg A megejelenítendő üzenet
     */
    showMessage(msg: Message) {
        this.message = msg;
        this.show = true;
    }

    /**
     * Elrejti az ablakot
     */
    hideMessage() {
        this.show = false;
    }
}
