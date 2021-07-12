class Level {
    /**
     * 
     * @param {string[]} plan 
     */
    constructor(plan) {
        this.size = new Vector(plan[0].length, plan.length);

        /**
         * @type {Entity[]}
         */
        this.entities = [];

        /**
         * @type { Player? }
         */
        this.player = null;

        /**
         * the player's starting position
         * @type { Vector? }
         */
        this.starting_position = null;

        plan.forEach((line, y) => {
            line.split("").forEach((character, x) => {
                // not exactly the best way to do this, but...
                switch (character) {
                    case "#":
                        this.entities.push(new Block(new Vector(x, y), BLOCK_SIZE, "block"));
                        break;
                    case "@":
                        this.starting_position = new Vector(x, y + 1 - PLAYER_SIZE.y - 0.01);
                        this.player = new Player(this.starting_position.clone);
                        this.entities.push(this.player);
                        break;
                    // others to be added soon
                }
            });
        });

        if (this.player == null) {
            console.error("player is not present in this level!");
        }
    }

    update(lapse) {
        this.entities = this.entities.filter(entity => {
            return entity.update(lapse, this.entities);
        });

        if (this.player.position.y > this.size.y * 1.5) {
            this.player.position = this.starting_position.clone;
        }
    }
}
