class Entity {
    /**
     * @param {Vector} position 
     * @param {Vector} size
     */
    constructor(position, size) {
        this.position    = position;
        this.motion      = new Vector(0, 0);
        this.size        = size;
        this.collideable = true;
        this.colour      = "white";
        this.active      = true;
    }

    get center() {
        return this.position.add(this.size.multiply(0.5));
    }

    /**
     * @param {Vector} offset 
     */
    translate(offset) {
        this.position = this.position.add(offset);
    }

    /**
     * @param {Vector} position 
     */
    translate_to(position) {
        this.position = position;
    }
    // not sure if i'll actually need this

    /**
     * @param {Vector} position 
     */
    center_to(position) {
        this.position = position.subtract(this.size.multiply(0.5));
    }

    /**
     * @param {Number} lapse 
     * @param {Entity[]} entities 
     */
    update(lapse, entities) {
        // basic movement and collision detection
        var future_position = this.position.add(this.motion.multiply(lapse));
        var future_x        = new Vector(future_position.x, this.position.y);
        var future_y        = new Vector(this.position.x, future_position.y);

        for (var c = 0; c < entities.length; c++) {
            var other = entities[c];
            if (!other.collideable || other == this) continue;
            if (check_collision(future_x, this.size, other.position, other.size)) {
                future_x.x    = this.position.x;
                this.motion.x = 0;
            }
            if (check_collision(future_y, this.size, other.position, other.size)) {
                future_y.y    = this.position.y;
                this.motion.y = 0;
            }
        }
        this.position.x = future_x.x;
        this.position.y = future_y.y;

        return true;
    }
}

/**
 * @param {Vector} position_1 
 * @param {Vector} size_1 
 * @param {Vector} position_2 
 * @param {Vector} size_2 
 */
function check_collision(position_1, size_1, position_2, size_2) {
    if (position_1.x > position_2.x + size_2.x) return false;
    if (position_1.y > position_2.y + size_2.y) return false;
    if (position_2.x > position_1.x + size_1.x) return false;
    if (position_2.y > position_1.y + size_1.y) return false;
    return true;
}

const GRAVITY = 0.001;