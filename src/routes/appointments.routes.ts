import { parseISO } from 'date-fns';
import { Router } from 'express';
import { appointmentsRepository } from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const CreateAppointment = new CreateAppointmentService();

    const appointment = CreateAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    let errorMessage;
    if (err instanceof Error) {
      errorMessage = { error: err.message };
    }
    return response.status(400).json(errorMessage);
  }
});

export default appointmentsRouter;
