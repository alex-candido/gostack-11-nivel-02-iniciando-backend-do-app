import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await UsersRepository.findOneBy({ email });

    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    const user = UsersRepository.create({
      name,
      email,
      password,
    });

    await UsersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
