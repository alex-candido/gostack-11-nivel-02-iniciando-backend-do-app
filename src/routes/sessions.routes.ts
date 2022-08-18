import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateRefactoredUser from '../services/CreateRefactoredUser';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const dataUser = await authenticateUser.execute({
      email,
      password,
    });

    const user = new CreateRefactoredUser(dataUser.user);

    return response.json({ user });
  } catch (err) {
    let errorMessage;
    if (err instanceof Error) {
      errorMessage = { error: err.message };
    }
    return response.status(400).json(errorMessage);
  }
});

export default sessionsRouter;
