"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const Appointment_1 = __importDefault(require("../models/Appointment"));
class AppointmentsRepository {
    constructor() {
        this.appointments = [];
    }
    all() {
        return this.appointments;
    }
    findByDate(date) {
        const findAppointment = this.appointments.find(appointment => (0, date_fns_1.isEqual)(date, appointment.date));
        return findAppointment || null;
    }
    create({ provider, date }) {
        const appointment = new Appointment_1.default({ provider, date });
        this.appointments.push(appointment);
        return appointment;
    }
}
exports.default = AppointmentsRepository;
