import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateRefactoredUser from '../services/CreateRefactoredUser';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const userRef = new CreateRefactoredUser(user);

    return response.json({ userRef, token });
  } catch (err) {
    let errorMessage;
    if (err instanceof Error) {
      errorMessage = { error: err.message };
    }
    return response.status(400).json(errorMessage);
  }
});

export default sessionsRouter;
