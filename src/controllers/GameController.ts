import { Body, Get, JsonController, OnUndefined, Post, Put } from "routing-controllers";

import { Game, GameState, Role, Side } from "../domain/Game";
import { userRepository } from "../infrastructure/User/UserRepository";

@JsonController("/game")
export class GameController {

	@Get("/")
	public async getState(): Promise<GameState> {
		const game = Game.getInstance();
		return game.getState();
	}

	@Put("/")
	@OnUndefined(204)
	public async updateCount(
		@Body() { count }: { count: number[] }
	): Promise<void> {
		const game = Game.getInstance();

		game.updateCount(count);
	}

	@Post("/")
	public async addPlayer(
		@Body() { role, side, id }: { role: Role, side: Side, id: string }
	): Promise<GameState> {
		const game = Game.getInstance();

		const { password, ...user } = await userRepository.getUser(id);

		game.addPlayer({ role, side, user });

		return game.getState();
	}

}
