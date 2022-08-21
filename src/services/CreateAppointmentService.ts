import { startOfHour } from 'date-fns';
import AppError from '../errors/AppError';
import Appointment from '../models/Appointment';
import AppointmentsRepository, {
  appointmentsRepository,
} from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await new AppointmentsRepository();
    const findAppointment = await findAppointmentInSameDate.findByDate(
      appointmentDate,
    );

    if (findAppointment) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
