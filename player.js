const MOVE_SPEED = 0.004;
const JUMP       = -0.04;

class Player extends Entity {
    /**
     * @param {Vector} position 
     */
    constructor(position) {
        super(position, new Vector(0.75, 1.3));
        this.colour   = "red";
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
        }
        if (keys[key_mapping.right]) {
            this.motion.x += MOVE_SPEED;
        }
        if (rising_edge(key_mapping.up)) {
            this.motion.y = JUMP;
        }

        this.motion.y += GRAVITY;

        super.update(lapse, entities);
        return true;
    }
}
