class Game {
    constructor() {
        this.players = [];
        this.count = [];
        this.isRunning = false;
    }

    async init() {
        const { data } = await axios.get('http://localhost:3000/game');
        this.players = data.players;
        this.count = data.count;
        this.isRunning = data.isRunning;
    }

    get state() {
        return {
            playes: this.players,
            count: this.count,
            isRunning: this.isRunning
        }
    }

}

(async function() {
    const game = new Game();

    await game.init();

    console.log(game.state);
})();