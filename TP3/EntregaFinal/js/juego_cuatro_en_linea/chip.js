class Chip {
    constructor(posX, posY, size, image, context, team) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.image = image;
        this.context = context;
        this.team = team;
        this.movable = false;
        this.highlighted = false;
    }

    setHighlighted(boolean) {
        this.highlighted = boolean;
    }

    setPosition(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    setSize(newSize) {
        this.size = newSize;
    }

    setMovable(boolean) {
        this.movable = boolean;
    }

    setImage(image) {
        this.image = image;
    }

    getImage() {
        return this.image;
    }

    getPosition() {
        return {
            x: this.getPosX,
            y: this.getPosY
        }
    }
    
    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getTeam() {
        return this.team;
    }

    getSize() {
        return this.size;
    }

    isPointInside(x, y) {
        let _x = this.posX - x + this.size/2;
        let _y = this.posY - y + this.size/2;
        return Math.sqrt(_x * _x + _y * _y) < (this.size/2);
    }

    isMovable() {
        return this.movable;
    }

    move(xMove, yMove) {
        this.setPosition(this.posX + xMove, this.posY + yMove);
    }

    newCopy() {
        return new Chip(this.getPosX()
                        , this.getPosY()
                        , this.getSize()
                        , this.getImage()
                        , this.context
                        , this.getTeam());
    }

    equals(chip) {
        return this.team === chip.getTeam();
    }

    draw() {
        if (this.image) {
            this.context.drawImage(this.image, this.posX, this.posY, this.size, this.size);
        }
    }
}