import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from 'src/auth/dtos/auth';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(data: SignupDto) {
    const { name, email, horaInicio, horaFim, data: dataStr } = data;

    if (horaInicio >= horaFim) {
      throw new UnauthorizedException('Hora inicial deve ser menor que a final');
    }

    const dataBase = parseDateBR(dataStr);

    const reservasCriadas: {
      id: number;
      horario: number;
      data: Date;
    }[] = [];

    // Verifica todas as horas do intervalo
    for (let hora = horaInicio; hora < horaFim; hora++) {
      const dataComHora = new Date(dataBase);
      dataComHora.setHours(hora);

      const existente = await this.prismaService.user.findFirst({
        where: {
          horario: hora,
          data: dataComHora,
        },
      });

      if (existente) {
        throw new UnauthorizedException(`Horário ${hora}h já está ocupado`);
      }

      const reserva = await this.prismaService.user.create({
        data: {
          name,
          email,
          horario: hora,
          data: dataComHora,
        },
      });

      reservasCriadas.push({
        id: reserva.id,
        horario: reserva.horario,
        data: reserva.data,
      });
    }

    const valorTotal = (horaFim - horaInicio) * 60;

    return {
      nome: name,
      email,
      data: dataStr,
      totalHoras: horaFim - horaInicio,
      valor: `R$${valorTotal},00`,
      reservas: reservasCriadas,
    };
  }
}



// Função auxiliar para converter "10/03/2025" → Date
function parseDateBR(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/');
  return new Date(`${year}-${month}-${day}T00:00:00`);
}



