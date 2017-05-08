"use strict";
var Message = (function () {
    function Message(title, body, broadcast, id, sender, date) {
        if (title === void 0) { title = ""; }
        if (body === void 0) { body = ""; }
        if (broadcast === void 0) { broadcast = false; }
        if (id === void 0) { id = 0; }
        if (sender === void 0) { sender = ""; }
        if (date === void 0) { date = ""; }
        this.id = id;
        this.title = title;
        this.sender = sender;
        this.date = date;
        this.body = body;
        this.broadcast = broadcast;
    }
    Message.prototype.getJson = function () {
        return {
            title: this.title,
            body: this.body,
            broadcast: this.broadcast
        };
    };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=Message.js.map