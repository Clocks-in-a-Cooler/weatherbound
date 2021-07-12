const MOVE_SPEED = 0.01;
const JUMP       = -0.02;

const PLAYER_SIZE = new Vector(1.5, 2.25); //new Vector(3, 4.5);

class Player extends Entity {
    /**
     * @param {Vector} position
     */
    constructor(position) {
        super(position, PLAYER_SIZE);
        this.colour = "red";
        this.facing = "right";
    }

    /**
     * 
     * @param {Number} lapse 
     * @param {Entity[]} entities 
     */
    update(lapse, entities) {
        // controls:
        this.motion.x = 0;

        if (keys[key_mapping.left]) {
            this.motion.x -= MOVE_SPEED;
            this.facing    = "left";
        }
        if (keys[key_mapping.right]) {
            this.motion.x += MOVE_SPEED;
            this.facing    = "right";
        }
        if (rising_edge(key_mapping.up)) {
            this.motion.y = JUMP;
        }

        this.motion.y += GRAVITY;

        super.update(lapse, entities);
        return true;
    }
}
