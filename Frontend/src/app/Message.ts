export class Message {
    id: number;
    public title: string;
    sender: string;
    public date: string;
    public body: string;
    broadcast: boolean;
    public recipients: Array<string>;

    constructor(title: string = "" , body: string = "" , broadcast: boolean = false, id: number =  0, sender: string = "", date: string = ""){
        this.id = id;
        this.title = title;
        this.sender = sender;
        this.date = date;
        this.body = body;
        this.broadcast = broadcast;
        this.recipients = [];
    }

    public getJson() {
        return {
            title: this.title,
            body: this.body,
            broadcast: this.broadcast,
            recipients: this.recipients
        };
    }
}
