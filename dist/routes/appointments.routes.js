"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const express_1 = require("express");
const ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
const AppointmentsRepository_1 = require("../repositories/AppointmentsRepository");
const CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.use(ensureAuthenticated_1.default);
appointmentsRouter.get('/', async (request, response) => {
    console.log(request.user);
    const appointments = await AppointmentsRepository_1.appointmentsRepository.find();
    return response.json(appointments);
});
appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;
    const parsedDate = (0, date_fns_1.parseISO)(date);
    const CreateAppointment = new CreateAppointmentService_1.default();
    const appointment = await CreateAppointment.execute({
        date: parsedDate,
        provider_id,
    });
    return response.json(appointment);
});
exports.default = appointmentsRouter;
