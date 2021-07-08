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
        this.player   = null;

        plan.forEach((line, y) => {
            line.split("").forEach((character, x) => {
                // not exactly the best way to do this, but...
                switch (character) {
                    case "#":
                        this.entities.push(new Block(new Vector(x, y), new Vector(1, 1), "block"));
                        break;
                    case "@":
                        this.player = new Player(new Vector(x, y - 1));
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
    }
}
