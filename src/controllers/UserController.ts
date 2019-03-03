import { Body, Get, JsonController, OnUndefined, Post, Put } from "routing-controllers";

import { userRepository } from "../infrastructure/User/UserRepository";
import { CreateUserForm } from "./validation/CreateUserForm";
import { User } from "../domain/User/User";
import { generatePasswordHash, getSalt } from "../components/crypto";
import { LoginParamForm } from "./validation/LoginParamForm";

@JsonController("/user")
export class UserController {

	@Post("/")
	public async createUser(
        @Body() form: CreateUserForm
    ): Promise<User> {
		const { password, ...user } = form;

		const hashPassword = generatePasswordHash(password);
		
		return userRepository.save({ ...user, password: hashPassword });
	}

	@Post("/auth")
	public async login(
		@Body() { login, password }: LoginParamForm
	): Promise<User> {
		const user = await userRepository.getUserByLogin(login);
		if (!user) {
			throw new Error(`Now found user with ${login}`);
		}
		const salt = getSalt(user.password);
		const hashPassword = generatePasswordHash(password, salt);

		if (user.password !== hashPassword) {
			throw new Error("Wrong password");
		}

		return user;

	}

}
