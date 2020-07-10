/** I want to show fireworks on click. And have a running counter of how many fireworks were shot in a session. 




/**
 * @class Firework
 * @public @property {number} x 
 * @public @property {number} y
 * @public @property {Array<Particle>} particles
 * @public @property {number} totalParticles
 * @public @property {{min: number, max: number}} particlesSpeedRange
 * @public @property {radius} radius
 * @public @property {{min: number, max: number}} rangeX
 * @public @property {{min: number, max: number}} rangeY
 * @public @property {number} outOfBoundCount
 * @public @property {boolean} hasExploded
 * @public @property {Particle} rocket
 * @public @property {number} rocketSpeed
 * @public @property {Vector2} gravity
 * @public @property {{r: number, g: number, b: number}} color
 * @public @property {boolean} isInitialized
 */
class Firework {
    /**
     * Creates an instance of Firework.
     * @param {number} [canvasWidth=800] 
     * @param {number} [canvasHeight=600] 
     * @memberof Firework
     */
    constructor(canvasWidth = 640, canvasHeight = 480) {
        this.isInitialized = false;
        /**@type {number} */
        this.x = null;
        /**@type {number} */
        this.y = null;
        /**@type {Array<Particle>} */
        this.particles = [];
        this.totalParticles = 100;
        this.particlesSpeedRange = {min: 100, max: 300};
        this.radius = 140;
        this.rangeX = {min: this.radius, max: canvasWidth - this.radius};
        this.rangeY = {min: this.radius, max: 2 * this.radius};
        this.outOfBoundCount = 0;
        this.hasExploded = false;
        this.rocket =  new Particle(0, canvasHeight, 0, 0);
        this.rocketSpeed = 800;
        this.gravity =  new Vector2(0, 0.12);
        this.color = {r: 255, g: Math.round(Math.random() * 255), b: ~~(Math.random() * 255)}
    }

    /**
     * @param {number} min 
     * @param {number} max 
     * @returns {number}
     * @memberof Firework
     */
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Set firework explosion position
     * @memberof Firework
     */
    setRandomPosition() {
        this.x = this.getRandomIntInclusive(this.rangeX.min, this.rangeX.max);
        this.y = this.getRandomIntInclusive(this.rangeY.min, this.rangeY.max);
    }

    /**
     * Instantiate particles at random speeds and random directions
     * @param {number} dt delta time: the time between the last two frames in seconds 
     * @memberof Firework
     */
    initParticles(dt) {
        for (let i = 0; i < this.totalParticles; i++) {
            const speed = this.getRandomIntInclusive(this.particlesSpeedRange.min, this.particlesSpeedRange.max) * dt;
            const angle = Math.random() * Math.PI * 2;
            this.particles[i] = new Particle(this.x, this.y, speed, angle);
            this.particles[i].isVisible = true;
        }
    }

    /**
     * Set the position, random speed and random direction foreach particle
     * @param {number} dt delta time: the time between the last two frames in seconds 
     * @memberof Firework
     */
    resetPaticles(dt) {
        this.particles.forEach(function(particle) {
            const speed = this.getRandomIntInclusive(this.particlesSpeedRange.min, this.particlesSpeedRange.max) * dt;
            const angle = Math.random() * Math.PI * 2;
            particle.position.setX(this.x);
            particle.position.setY(this.y);
            particle.velocity.setLength(speed);
            particle.velocity.setAngle(angle);
            particle.isVisible = true;
        }, this);
    }

    /**
     * Reset the rocket position, speed and direction 
     * @param {number} dt delta time: the time between the last two frames in seconds
     * @param {CanvasRenderingContext2D} ctx 
     * @memberof Firework
     */
    resetRocket(dt, ctx) {
        this.setRandomPosition();
        this.hasExploded = false;
        this.rocket.position.setX(this.x);
        this.rocket.position.setY(ctx.canvas.height);
        this.rocket.velocity.setLength(this.rocketSpeed * dt);
        this.rocket.velocity.setAngle(-Math.PI * 0.5);
    }

    /**
     * Update the fireworks position
     * @param {number} dt delta time: the time between the last two frames in seconds
     * @param {CanvasRenderingContext2D} ctx 
     * @memberof Firework
     */
    update(dt, ctx) {
        if(!this.isInitialized) {
            this.setRandomPosition();
            this.resetRocket(dt, ctx);
            this.initParticles(dt);
            this.isInitialized = true;
        }

        if(this.rocket.position.getY() <= this.y) {
            this.hasExploded = true;
        }

        if(!this.hasExploded) {
            this.rocket.update();
        } else {
            this.particles.forEach(function(particle) {
                particle.accelerate(this.gravity);
                particle.update();
            }, this);
    
            this.particles.forEach(function(particle) {
                const magnitude = Math.sqrt(Math.pow(particle.position.getX() - this.x, 2) +  Math.pow(particle.position.getY() - this.y, 2));
                if(magnitude >= this.radius) {
                    this.outOfBoundCount++;
                    particle.isVisible = false;
                }
            }, this);
    
            if(this.outOfBoundCount >= this.totalParticles) {
                this.setRandomPosition();
                this.resetRocket(dt, ctx);
                this.resetPaticles(dt);
            }        
    
            this.outOfBoundCount = 0;
        }
    }

    /**
     * Update the fireworks drawings
     * @param {CanvasRenderingContext2D} ctx 
     * @memberof Firework
     */
    draw(ctx) {
        ctx.save()
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        if(!this.hasExploded) {
            ctx.fillRect(this.rocket.position.getX(), this.rocket.position.getY(), 6, 12);
        } else {
            this.particles.forEach(function(particle) {
                if(particle.isVisible) {
                    ctx.fillRect(particle.position.getX(), particle.position.getY(), 3, 3);
                }
            }, this);
        }
        ctx.restore();
    }
}

