window.addEventListener('DOMContentLoaded', function() {

    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
 
    /**@type {{now: number, previous: number, framesToSkip: number, frameSkipped: number, frames: number}} */
    const timer = {
        now: performance.now(),
        previous: null,
        framesToSkip: 2,
        frameSkipped: 0,
        updateFrameStarted() {
            this.previous = this.now;
        },
        updateFrameEnded() {
            this.now = performance.now();
        },
        getDelta: function() {
            return (this.now - this.previous) / 1000;
        }, 
        getFps: function() {
            return 1 / this.getDelta();
        }
    }

    /**@type {{time: number, delay: number, total: number, launched: number, content: Array<Firework>, rocketsOnScreen: number, sparksOnScreen: number}} */
    const fireworks = {
        time: performance.now(),
        delay: 500,
        total: 20,
        launched: 0,
        content: [],
        rocketsOnScreen: 0,
        sparksOnScreen: 0,
        updateCount: function() {
            this.rocketsOnScreen = 0;
            this.sparksOnScreen = 0;
            this.content.forEach(function(firework) {
                if(firework.rocket.position.getY() < ctx.canvas.height && firework.rocket.position.getY() > firework.y) {
                    this.rocketsOnScreen++;
                }
                if(firework.hasExploded) {
                    firework.particles.forEach(function(particle) {
                        if(particle.isVisible) {
                            this.sparksOnScreen++;
                        }
                    }, this);
                }
            }, this);
        }
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        /** SKip the first two frames for more accurate timings */
        if(timer.frameSkipped < timer.framesToSkip) {
            timer.frameSkipped++;
        } else {
            /** Delay Instanctiation of firework objects until the number of fireworks wanted is reached*/
            if(fireworks.launched < fireworks.total) {
                if(performance.now() - fireworks.time >= fireworks.delay) {
                    fireworks.content.push(new Firework(canvas.width, canvas.height));
                    fireworks.launched++;
                    fireworks.time = performance.now();
                }
            }
            /** Update, count and draw the fireworks */
            if(fireworks.content.length > 0) {
                fireworks.content.forEach(function(firework) {
                    firework.update(timer.getDelta(), ctx);
                });
                
                fireworks.updateCount();                
                fireworks.content.forEach(function(firework) {
                    firework.draw(ctx);
                });
            }
            /** Draw fps and particles count */
            ctx.save();
            ctx.restore();
          
        }
        /** Frame started*/
        timer.updateFrameStarted();
        requestAnimationFrame(update);
        /** Frame ended */
        timer.updateFrameEnded();
    }
    update();

}, false);