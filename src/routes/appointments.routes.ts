import { parseISO } from 'date-fns';
import { Router } from 'express';
import { appointmentsRepository } from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const CreateAppointment = new CreateAppointmentService();

    const appointment = await CreateAppointment.execute({
      date: parsedDate,
      provider_id,
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
