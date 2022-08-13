"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const express_1 = require("express");
const AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
const appointmentsRouter = (0, express_1.Router)();
const appointmentsRepository = new AppointmentsRepository_1.default();
// SoC: Separations of concerns (Separação de preocupações)
appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});
appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parsedDate = (0, date_fns_1.startOfHour)((0, date_fns_1.parseISO)(date));
    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);
    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }
    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate,
    });
    return response.json(appointment);
});
exports.default = appointmentsRouter;
