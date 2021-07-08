class Vector {
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x, y) {
        this.x = x; this.y = y;
    }

    get length() {
        return Math.hypot(this.x, this.y);
    }

    get taxicab_length() {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    /**
     * @param {Vector} other
     */
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    /**
     * @param {Vector} other
     */
    subtract(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    /**
     * @param {Number} factor
     */
    multiply(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }

    /**
     * 
     * @param {Number} new_length
     */
    scale(new_length) {
        return this.multiply(new_length / this.length);
    }
}