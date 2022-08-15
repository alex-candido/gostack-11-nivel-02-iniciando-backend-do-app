import AppDataSource from '../data-source';
import Appointment from '../models/Appointment';

export const appointmentsRepository = AppDataSource.getRepository(Appointment);

class AppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await appointmentsRepository.findOneBy({
      date,
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
