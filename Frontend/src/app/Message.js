"use strict";
var Message = (function () {
    function Message(id, title, sender, date, body) {
        if (id === void 0) { id = 0; }
        if (title === void 0) { title = ""; }
        if (sender === void 0) { sender = ""; }
        if (date === void 0) { date = ""; }
        if (body === void 0) { body = ""; }
        this.id = id;
        this.title = title;
        this.sender = sender;
        this.date = date;
        this.body = body;
    }
    return Message;
}());
exports.Message = Message;
;
//# sourceMappingURL=Message.js.map