import AppDataSource from "../data-source";
import User from "../models/User";

export const UsersRepository = AppDataSource.getRepository(User);
