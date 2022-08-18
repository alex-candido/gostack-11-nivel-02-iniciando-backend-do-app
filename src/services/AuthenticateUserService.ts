import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
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

    const token = sign({}, '0d3d23ecd5429d6564ce93a6b2d9875a', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
