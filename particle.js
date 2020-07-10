
/**
 * @class Particle
 * @public @property {Vector2} position
 * @public @property {Vector2} velocity
 */
class Particle {
    /**
     * Creates an instance of Particle.
     * @param {number} x 
     * @param {number} y 
     * @param {number} speed 
     * @param {number} direction 
     * @memberof Particle
     */
    constructor(x, y, speed, direction) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2();
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);
    }

    /**
     * 
     * @param {Vector2} v 
     * @memberof Particle
     */
    accelerate(v) {
        this.velocity.addTo(v);
    }

    update() {
        this.position.addTo(this.velocity);
    }
}
