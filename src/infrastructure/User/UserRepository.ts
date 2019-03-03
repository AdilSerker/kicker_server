import { User } from "src/domain/User/User";
import { getRepository, getConnection, EntityManager } from "typeorm";
import { UserModel } from "./model/UserModel";
import { plainToClass } from "class-transformer";

class UserRepository {
	public async getUser(id: string): Promise<User> {
		return getRepository(UserModel).findOne(id);
	}

	public async getUserByLogin(login: string): Promise<User> {
		return getRepository(UserModel).findOne({ where: { login } });
	}

	public async save(user: User): Promise<User> {

		return getRepository(UserModel).save(plainToClass(UserModel, user));
	}

}

export const userRepository = new UserRepository();
