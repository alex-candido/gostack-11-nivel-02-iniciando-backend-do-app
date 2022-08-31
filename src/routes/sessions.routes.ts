import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateRefactoredUser from '../services/CreateRefactoredUser';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const userRef = new CreateRefactoredUser(user);

  return response.json({ user: userRef, token });
});

export default sessionsRouter;
