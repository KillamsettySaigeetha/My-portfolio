/**
 * @class Vector2
 * @private @property {number} _x
 * @private @property {number} _y
 */
class Vector2 {
    /**
     * Creates an instance of Vector2.
     * @param {number} [x=0] x coordinate
     * @param {number} [y=0] y coordinate
     * @memberof Vector2
     */
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    /**
     * Get Vector2 x coordinate
     * @returns {number}  
     * @memberof Vector2
     */
    getX() {
        return this._x;
    }

    /**
     * Set Vector2 x coordinate
     * @param {number} value 
     * @memberof Vector2
     */
    setX(value) {
        this._x = value;
    }

    /**
     * Get Vector2 y coordinate
     * @returns {number}
     * @memberof Vector2
     */
    getY() {
        return this._y;
    }

    /**
     * Set Vector2 y coordinate
     * @param {any} value 
     * @memberof Vector2
     */
    setY(value) {
        this._y = value; 
    }

    /**
     * Get Vector2 direction in radians 
     * @returns {number}
     * @memberof Vector2
     */
    getAngle() {
        return Math.atan2(this._y, this._x);
    }

    /**
     * Set Vector2 direction
     * @param {number} angle 
     * @memberof Vector2
     */
    setAngle(angle) {
        const length = this.getLength();
        this._x = length * Math.cos(angle);
        this._y = length * Math.sin(angle);
    }

    /**
     * Get Vector2 magnitude
     * @returns {number}
     * @memberof Vector2
     */
    getLength() {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    /**
     * Set Vector2 magnitude
     * @param {number} length 
     * @memberof Vector2
     */
    setLength(length) {
        const angle = this.getAngle();
        this._x = length * Math.cos(angle);
        this._y = length * Math.sin(angle);
    }
    
    /**
     * 
     * Add two Vector2 instances 
     * and return the sum as a new Vector2 instance
     * @param {Vector2} v 
     * @returns {Vector2}
     * @memberof Vector2
     */
    add(v) {
        return new Vector2(this._x + v.getX(), this._y + v.getY());
    }

    /**
     * Substract two Vector2 instances 
     * and return the substraction as a new Vector2 instance
     * @param {Vector2} v 
     * @returns {Vector2}
     * @memberof Vector2
     */
    substract(v) {
        return new Vector2(this._x - v.getX(), this._y - v.getY());
    }

    /**
     * Multiply a Vector2 instance by a scalar value
     * and return the multiplication as a new Vector2 instance
     * @param {number} scalar 
     * @returns {Vector2}
     * @memberof Vector2
     */
    multiply(scalar) {
        return new Vector2(this._x * scalar, this._y * scalar);
    }

    /**
     * Multiply a Vector2 instance by a scalar value
     * and return the multiplication as a new Vector2 instance
     * @param {any} scalar 
     * @returns {Vector2}
     * @memberof Vector2
     */
    divide(scalar) {
        return new Vector2(this._x / scalar, this._y / scalar);
    }

    /**
     * Mutate the current Vector2 instance
     * by adding a Vector2 inastance
     * @param {Vector2} v 
     * @memberof Vector2
     */
    addTo(v) {
        this._x += v.getX();
        this._y += v.getY();
    }

    /**
     * Mutate the current Vector2 instance
     * by substracting a Vector2 inastance
     * @param {Vector2} v 
     * @memberof Vector2
     */
    substractFrom(v) {
        this._x -= v.getX();
        this._y -= v.getY();
    }
    
    /**
     * Mutate the current Vector2 instance
     * by multiplying it with a scalar value
     * @param {number} scalar 
     * @memberof Vector2
     */
    multiplyBy(scalar) {
        this._x *= v.getX();
        this._y *= v.getY();
    }

    /**
     * Mutate the current Vector2 instance
     * by dividing it with a scalar value
     * @param {any} scalar 
     * @memberof Vector2
     */
    divideBy(scalar) {
        this._x /= v.getX();
        this._y /= v.getY();
    }
}

