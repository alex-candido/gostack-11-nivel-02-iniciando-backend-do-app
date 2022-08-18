import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const validate = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json(validate);
});

export default sessionsRouter;
