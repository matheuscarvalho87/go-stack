import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// Data Transfer Object == DTO

interface CreateAppointmentDTO {
  provider: string;

  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  // Função que retorna lista com todos os repositórios
  public all(): Appointment[] {
    return this.appointments;
  }

  // Função que busca os repositórios pela data
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
