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

    const valorPorHora = 60;
    const dataBase = parseDateBR(dataStr);

    const reservasCriadas: {
      id: number;
      horario: number;
      data: Date;
      // valor removido aqui
    }[] = [];

    for (let hora = horaInicio; hora < horaFim; hora++) {
      const dataComHora = new Date(dataBase);
      dataComHora.setHours(hora, 0, 0, 0);

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
          valor: valorPorHora,
        },
      });

      reservasCriadas.push({
        id: reserva.id,
        horario: reserva.horario,
        data: reserva.data,
        // não inclua valor aqui
      });
    }

    const totalHoras = horaFim - horaInicio;
    const valorTotal = totalHoras * valorPorHora;

    return {
      nome: name,
      email,
      data: dataStr,
      totalHoras,
      valor: `R$${valorTotal},00`, // só aqui o valor aparece
      reservas: reservasCriadas,
    };
  }
}

// Função para converter data BR para Date local
function parseDateBR(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}
