import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository, {
  appointmentsRepository,
} from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await new AppointmentsRepository();
    const findAppointment = await findAppointmentInSameDate.findByDate(
      appointmentDate,
    );

    if (findAppointment) {
      throw new Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
