import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateRefactoredUser from '../services/CreateRefactoredUser';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const RefactoredUser = new CreateRefactoredUser(user);

    return response.json(RefactoredUser);
  } catch (err) {
    let errorMessage;
    if (err instanceof Error) {
      errorMessage = { error: err.message };
    }
    return response.status(400).json(errorMessage);
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  return response.json({ ok: true });
});

export default usersRouter;
