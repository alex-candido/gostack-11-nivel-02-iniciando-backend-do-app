import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const user = await UsersRepository.findOneBy({ email });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passewordMatched = await compare(password, user.password);

    if (!passewordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
