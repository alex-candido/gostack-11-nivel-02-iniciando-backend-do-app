"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentsRepository = void 0;
const data_source_1 = __importDefault(require("../data-source"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
exports.appointmentsRepository = data_source_1.default.getRepository(Appointment_1.default);
class AppointmentsRepository {
    async findByDate(date) {
        const findAppointment = await exports.appointmentsRepository.findOneBy({
            date,
        });
        return findAppointment || null;
    }
}
exports.default = AppointmentsRepository;
