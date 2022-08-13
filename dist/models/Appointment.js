"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
class Appointment {
    constructor({ provider, date }) {
        this.id = (0, uuidv4_1.uuid)();
        this.provider = provider;
        this.date = date;
    }
}
exports.default = Appointment;
