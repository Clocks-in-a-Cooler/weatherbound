class Block extends Entity {
    /**
     * 
     * @param {Vector} position 
     * @param {Vector} size 
     * @param {string} type
     */
    constructor(position, size, type) {
        super(position, size);
        this.type   = type;
        this.colour = "black";
    }

    /**
     * a block does nothing on update. for special blocks, this can be overridden.
     * @param {Number} lapse 
     * @param {Entity[]} entities 
     */
    update(lapse, entities) {
        return true;
    }
}

const BLOCK_SIZE = new Vector(1, 1);