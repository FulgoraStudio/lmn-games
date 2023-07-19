class Actor {
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} speed 
     * @param {Number} velocity 
     * @param {Number} acceleration 
     * @param {HTMLImageElement} image 
     */
    constructor(x, y, width, height, speed, velocity, acceleration, image){
        this._x = x;
        this._y =  y;
        this._width = width;
        this._height = height;
        this._speed = speed;
        this._velocity = velocity;
        this._acceleration = acceleration;
        this._image = image;
        this._idleImageSrc;
        this._tag = undefined;
        this._draw = undefined;
        this._update = undefined;
        this._currentAnimation = [];
        this._currentSpriteIndex = 0;
        this._isAnimating = false;
        this._animations = {};
        this._lastFrameTime = 0;
        this._fps = 15;
        this._expire = false;
    }

    get fps(){
        return this._fps
    }

    set fps(fps) {
        this._fps = fps;
    }

    get isAnimating() {
        return this._isAnimating;
    }

    get animations() {
        return this._animations;
    }

    set animations(anim) {
        this._animations = anim;
    }

    get x() {
        return this._x;
    }

    set x(newX) {
        this._x = newX;
    }

    get y() {
        return this._y;
    }

    set y(newY) {
        this._y = newY;
    }

    get width() {
        return this._width;
    }

    set width(newWidth) {
        this._width = newWidth;
    }

    get height() {
        return this._height;
    }

    set height(newHeight) {
        this._height = newHeight;
    }

    get speed() {
        return this._speed;
    }

    set speed(newSpeed) {
        this._speed = newSpeed;
    }

    get velocity() {
        return this._velocity;
    }

    set velocity(newVelocity) {
        this._velocity = newVelocity;
    }

    get acceleration() {
        return this._acceleration;
    }

    set acceleration(newAcceleration) {
        this._acceleration = newAcceleration;
    }

    get image() {
        return this._image;
    }

    set image(newImage) {
        this._image = newImage;
    }

    get idleImage() {
        return this._idleImageSrc;
    }

    set idleImage(newIdleImage) {
        this._idleImageSrc = newIdleImage;
    }



    get tag() {
        return this._tag;
    }

    set tag(newTag) {
        this._tag = newTag;
    }

    get draw() {
        return this._draw;
    }

    set expire(newExpire) {
        this._expire = newExpire;
    }

    get expire() {
        return this._expire;
    }
    
    set draw(callback) {
        if (typeof callback === 'function') {
            this._draw = callback;
        } else {
            throw new Error('draw must be a function');
        }
    }

    get update() {
        return this._update;
    }
    
    set update(callback) {
        if (typeof callback === 'function') {
            this._update = callback;
        } else {
            throw new Error('update must be a function');
        }
    }

    animate(currentTime, looped = false) {
        if (this._isAnimating) {
            let deltaTime = currentTime - this._lastFrameTime;
            let frameTime = 1000 / this._fps;

            if (deltaTime >= frameTime) {
                this._image.src = this._currentAnimation[this._currentSpriteIndex];
                this.nextSprite(looped);

                this._lastFrameTime = currentTime;
            }

            requestAnimationFrame((x) => this.animate(x, looped));
        }
    }

    playAnimation(animName, looped = false) {
        if (!this._isAnimating) {
            this._currentAnimation = this._animations[animName];//Array with animations
            this._isAnimating = true;
            this.animate(this._lastFrameTime, looped);
            this._lastFrameTime = performance.now();
        }
    }

    nextSprite(looped = false) {
        if (this._currentSpriteIndex + 1 < this._currentAnimation.length) {
            this._currentSpriteIndex += 1;
        } else if (looped) {
            this._currentSpriteIndex = 0;
        } else {
            this._expire = true;
        }
    }

    stopAnimation() {
        this._image.src = this._idleImageSrc;
        this._currentAnimation = [];
        this._isAnimating = false;
        this._currentSpriteIndex = 0;
    }
}