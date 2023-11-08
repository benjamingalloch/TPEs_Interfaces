class PlayerZone {

    constructor (context, name, team, chipImage, image_pile, chipSize, width, height, posDrawX, posDrawY) {
        let chipPosX = posDrawX + (width - chipSize * 1.5) / 2;
        let chipPosY = posDrawY + (height - chipSize * 1.5) / 2;
        this.chipSize = chipSize;
        this.chip = new Chip(chipPosX, chipPosY, chipSize * 1.5, chipImage, context, team);
        this.context = context;
        this.name = name;
        this.width = width;
        this.height = height;
        this.posDrawX = posDrawX;
        this.posDrawY = posDrawY;
        this.availableToPlay = false;
        this.image_pile = image_pile;
    }

    getTeam() {
        return this.chip.getTeam();
    }

    getChip() {
        let newChip = this.chip.newCopy();
        newChip.setSize(this.chipSize);
        let movement = (this.chipSize * 1.5 - this.chipSize)/2;
        newChip.move(movement, movement);
        return newChip; // Se crea una nueva instancia
    }

    getName() {
        return this.name;
    }

    setAvailableToPlay(boolean) {
        this.availableToPlay = boolean;
    }

    highlightName(boolean) {
        this.highlighted = boolean;
    }

    isAvailableToPlay() {
        return this.availableToPlay;
    }

    isChipClicked(x, y){
        return this.chip.isPointInside(x, y);
    }

    draw() {
        this.context.fillStyle = "rgba(255, 255, 255, 0.8)"; // Relleno blanco transparente

        let borderRadius = 25;
        let x = this.posDrawX;
        let y = this.posDrawY;

        // Dibuja el cuadrado con bordes redondeados
        this.context.beginPath();
        this.context.moveTo(x + borderRadius, y);
        this.context.arcTo(x + this.width, y, x + this.width, y + this.height, borderRadius);
        this.context.arcTo(x + this.width, y + this.height, x, y + this.height, borderRadius);
        this.context.arcTo(x, y + this.height, x, y, borderRadius);
        this.context.arcTo(x, y, x + this.width, y, borderRadius);
        this.context.closePath();

        this.context.fill(); // Rellena el cuadrado

        this.drawName();

        this.drawPile();
    }
    
    drawName() {
        this.context.font = '30px VT323';
        this.context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        let textWidth = this.context.measureText(this.name).width;
        let centerX = this.posDrawX + (this.width - textWidth) / 2;
    
        if (this.highlighted) {
            let textHeight = 10; 
            let arrowHeight = textHeight / 2; 
            let arrowWidth = 10; 
            let arrowSpacing = 6; 
            let arrowCenterY = this.posDrawY + 22;
    
            // Dibuja la flecha izquierda
            this.context.beginPath();
            this.context.moveTo(centerX - arrowSpacing, arrowCenterY);
            this.context.lineTo(centerX - arrowSpacing - arrowWidth, arrowCenterY - arrowHeight);
            this.context.lineTo(centerX - arrowSpacing - arrowWidth, arrowCenterY + arrowHeight);
            this.context.fill();
            this.context.closePath();
    
            // Dibuja la flecha derecha
            this.context.beginPath();
            this.context.moveTo(centerX + textWidth + arrowSpacing, arrowCenterY);
            this.context.lineTo(centerX + textWidth + arrowSpacing + arrowWidth, arrowCenterY - arrowHeight);
            this.context.lineTo(centerX + textWidth + arrowSpacing + arrowWidth, arrowCenterY + arrowHeight);
            this.context.fill();
            this.context.closePath();
        }
    
        this.context.fillText(this.name, centerX, this.posDrawY + 30);
    }
    

    drawChip() {
        this.chip.draw();
    }

    drawPile() {
        let desiredWidth = 115;
        let desiredHeight = 120;
    
        let pileX = this.posDrawX + (this.width - desiredWidth) / 2;
        let pileY = this.posDrawY + (this.height - desiredHeight) - 20;
    
        this.context.drawImage(this.image_pile, pileX, pileY, desiredWidth, desiredHeight);
    }
}