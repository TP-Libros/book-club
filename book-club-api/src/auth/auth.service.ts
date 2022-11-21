import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Associated } from 'src/associated/associated.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Associated)
    private associatedService: Repository<Associated>,
  ) {}

  async login(associated: Associated) {
    const { ass_userName, ass_password } = associated;
    const findAssociated = await this.associatedService.findOneBy({
      ass_userName: ass_userName,
    });
    if (!findAssociated)
      throw new HttpException('username or password incorrect', 404);
    const checkPassword = await compare(
      ass_password,
      findAssociated.ass_password,
    );
    if (!checkPassword)
      throw new HttpException('username or password incorrect', 404);

    const data = findAssociated;
    return data;
  }
}
