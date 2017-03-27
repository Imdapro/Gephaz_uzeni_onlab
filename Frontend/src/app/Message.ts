export class Message {
    id: number;
    title: string;
    sender: string;
    date: string;
    body: string;

    constructor(id:number = 0, title: string = "" , sender: string = "", date: string = "", body: string = ""){
        this.id = id;
        this.title = title;
        this.sender = sender;
        this.date = date;
        this.body = body;
    }
};