import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }


    async deleteUserByNameEmail(name: string, email: string) {
        return this.prisma.user.deleteMany({
            where: {
                name,
                email,
            },
        });
    }

}
