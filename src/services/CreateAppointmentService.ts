import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSampleDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSampleDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({ provider, date });

    return appointment;
  }
}

export default CreateAppointmentService;
