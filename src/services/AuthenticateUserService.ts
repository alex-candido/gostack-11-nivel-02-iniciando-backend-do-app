import { compare } from 'bcryptjs';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
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

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
