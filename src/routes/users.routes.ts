import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

    return response.json({ name });
});

export default usersRouter;
