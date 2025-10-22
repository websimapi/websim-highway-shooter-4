export default class Particle {
    constructor(game, x, y, options = {}) {
        this.game = game;
        this.x = x;
        this.y = y;
        
        const {
            baseColor = '100, 200, 255', // Blueish by default
            size = Math.random() * 5 + 2,
            speedX = Math.random() * 6 - 3, // -3 to 3
            speedY = Math.random() * 6 - 3, // -3 to 3
            gravity = 0.1,
            lifespan = Math.random() * 50 + 50
        } = options;

        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.gravity = gravity;
        this.lifespan = lifespan;
        this.active = true;
        this.color = `rgba(${baseColor}, ${Math.random() * 0.5 + 0.5})`;
    }

    update(deltaTime) {
        // Normalize physics to be consistent regardless of framerate
        const dtFactor = deltaTime / 16.67; // Assuming 60fps is the baseline

        this.speedY += this.gravity * dtFactor;
        this.x += this.speedX * dtFactor;
        this.y += this.speedY * dtFactor;
        this.lifespan--;
        
        if (this.lifespan <= 0) {
            this.active = false;
        }
    }

    draw(context) {
        context.fillStyle = this.color;
        context.globalAlpha = this.lifespan / 100; // Fade out
        context.fillRect(this.x, this.y, this.size, this.size);
        context.globalAlpha = 1.0; // Reset alpha
    }
}