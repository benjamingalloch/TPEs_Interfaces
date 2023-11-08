class Game {
    winnerName = 0;
    isMouseDown = false;
    
    boardWidth = 550;
    boardHeight = 500;
    playerZoneWidth = 200;
    playerZoneHeight = 300;
    chipSize = 50;

    constructor(canvas, context, playerName1, playerName2, lineSize
        , chipImage1, chipImage2, pileImage1, pileImage2, backgroundImage, time) {
        
        this.canvasWidth = canvas.width; 
        this.canvasHeight = canvas.height;
        this.context = context; 
        this.backgroundImage = backgroundImage;
        
        this.posBoardX = canvasWidth / 2 - this.boardWidth / 2; 
        this.posBoardY = canvasHeight / 2 - this.boardHeight / 2;

        this.posPlayerZone1X = this.posBoardX / 2 - this.playerZoneWidth / 2;
        this.posPlayerZone1Y = this.posBoardY + this.boardHeight - this.playerZoneHeight;

        this.posPlayerZone2X = this.canvasWidth - this.posBoardX / 2 - this.playerZoneWidth / 2;
        this.posPlayerZone2Y = this.posBoardY + this.boardHeight - this.playerZoneHeight;
        
        // Se crea el tablero
        this.board = new Board(lineSize, this.boardWidth, this.boardHeight, context
                    , this.posBoardX, this.posBoardY, this.chipSize);

        // Se crea la zona del primer jugador
        this.playerZone1 = new PlayerZone(context, playerName1, 1, chipImage1, pileImage1, this.chipSize
                            , this.playerZoneWidth, this.playerZoneHeight, this.posPlayerZone1X, this.posPlayerZone1Y);
        
        // Se crea la zona del segundo jugador
        this.playerZone2 = new PlayerZone(context, playerName2, 2, chipImage2, pileImage2, this.chipSize
                            , this.playerZoneWidth, this.playerZoneHeight, this.posPlayerZone2X, this.posPlayerZone2Y); 
    
        // Posicion del texto de turnos
        this.textTurnPosX = this.canvasWidth / 2;
        this.textTurnPosY = (this.canvasHeight - this.board.getHeight()) / 4;
        
        // Setear turno
        this.teamTurn = Math.floor(Math.random() * 2) + 1; // Devuelve aleatoriamente 1 o 2
        
        this.activeChip = null;

        this.time = time; 
        this.secondsLeft = time;
        this.intervalId;
        this.startTimer();
    }

    reset() {
        this.teamTurn = Math.floor(Math.random() * 2) + 1; // Devuelve aleatoriamente 1 o 2
        this.activeChip = null;
        this.secondsLeft = this.time;
    
        // Reinicia el tablero
        this.board.initializeEmptyBoard();
        
        // Reinicia el timer
        this.startTimer();

        this.drawFrame();
    }

    startTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId); // Detiene el intervalo actual
        }
        this.intervalId = setInterval(() => {
            this.secondsLeft--;
            if (this.secondsLeft <= 0) {
                clearInterval(this.intervalId);
                this.endGame();
            }
            this.drawFrame(); // Vuelve a dibujar el frame para actualizar el contador
        }, 1000);
    }

    onMouseDown(e) {
        this.isMouseDown = true;
        if ((this.teamTurn === this.playerZone1.getTeam()) && (this.playerZone1.isChipClicked(e.layerX, e.layerY))){
            this.activeChip = this.playerZone1.getChip();
        } else if ((this.teamTurn === this.playerZone2.getTeam()) && (this.playerZone2.isChipClicked(e.layerX, e.layerY))) {
            this.activeChip = this.playerZone2.getChip();
        }
        this.drawFrame();
    }

    onMouseMove(e) {
        if(this.isMouseDown && this.activeChip) {
            this.activeChip.setPosition(e.layerX - this.chipSize / 2, e.layerY - this.chipSize / 2);
        }
        this.drawFrame();
    }

    onMouseUp(e) {
        this.isMouseDown = false;
        if (this.activeChip) {
            if (this.board.isChipOnDropZone(this.activeChip)) {
                if(this.board.dropChip(this.activeChip)){
                    if (this.board.hasAWinner()) {  
                        // Ejecutar un endGame
                        if (this.teamTurn === 1) {
                            this.winnerName = this.playerZone1.getName();
                        } else if (this.teamTurn === 2){
                            this.winnerName = this.playerZone2.getName();
                        }
                        this.teamTurn = 0;
                    } else if (this.board.hasEmptyCells()){
                        // Cambiar de turno
                        if (this.teamTurn === 1) {
                            this.teamTurn = 2;
                        } else if (this.teamTurn === 2){
                            this.teamTurn = 1;
                        }
                    } else {
                        // Ejecutar un endGame
                        this.teamTurn = 0;
                    }
                }
            }
            this.activeChip = null;
        }
        this.drawFrame();
    }

    endGame() {
        if ((this.teamTurn == 0) && (this.winnerName)) {
            this.drawText("GANADOR " + this.winnerName, this.textTurnPosX, this.textTurnPosY); // Caso donde un jugador gana
        }
        if ((!this.winnerName) || (this.secondsLeft === 0)) {
            this.teamTurn = 0;
            this.drawText("EMPATE", this.textTurnPosX, this.textTurnPosY);
        }
        if (this.intervalId) {
            clearInterval(this.intervalId); // Detiene el intervalo actual
        }
        this.activeChip = null;
        this.intervalId = null;
        this.playerZone1.highlightName(false);
        this.playerZone2.highlightName(false);
    }

    clearCanvas() {
        this.context.fillStyle = 'transparent';
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawFrame() {
        this.clearCanvas(); // Borrar pantalla
        this.drawBackground(this.backgroundImage); // Dibujar fondo
        this.board.draw(); // Dibujar tablero

        // Indicar de quien es el turno
        if (this.teamTurn === 1) {
            this.drawText("Turno de " + this.playerZone1.getName(), this.textTurnPosX, this.textTurnPosY);
            this.playerZone1.highlightName(true);
            this.playerZone2.highlightName(false);
        } else if (this.teamTurn === 2){
            this.drawText("Turno de " + this.playerZone2.getName(), this.textTurnPosX, this.textTurnPosY);
            this.playerZone2.highlightName(true);
            this.playerZone1.highlightName(false);
        }

        switch (this.teamTurn) {
            case 0:
                this.endGame();
                break;
            case 1:
                this.drawText("Turno de " + this.playerZone1.getName(), this.textTurnPosX, this.textTurnPosY);
                break;
            case 2:
                this.drawText("Turno de " + this.playerZone2.getName(), this.textTurnPosX, this.textTurnPosY);
                break;
        }

        this.playerZone1.draw();
        if ((this.teamTurn === 2) || (!this.activeChip)) {// Si no se esta moviendo la ficha en su turno, esta se dibuja en la ubicacion del jugador
            this.playerZone1.drawChip();
        }

        this.playerZone2.draw();
        if ((this.teamTurn === 1) || (!this.activeChip)) {
            this.playerZone2.drawChip();
        }

        if (this.activeChip) {
            this.activeChip.draw();
        }
        this.drawTimer();
    }

    drawBackground(image) {
        var escala = canvas.width / image.width;
        var x = 0;
        var y = canvas.height - (image.height * escala) + 90;
        this.context.drawImage(image, x, y, image.width * escala, image.height * escala);
    }

    drawTimer() {
        let font = '30px VT323';
        this.context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        let text = 'Tiempo: ' + this.secondsLeft + ' segundos';
        let timerY = this.canvasHeight - (this.canvasHeight - this.board.getHeight()) / 4;
        this.drawText(text, this.textTurnPosX, timerY, font, 4);
    }

    drawText(text, x, y, font, strokeWidth) {
        let gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, 0);

        this.context.font = '50px VT323';
        if (font) {
            this.context.font = font; // Default
        }
        // Definir colores del gradiente
        gradient.addColorStop(0.2, 'yellow');
        gradient.addColorStop(0.6, 'violet');
        this.context.fillStyle = gradient;

        let textWidth = this.context.measureText(text).width;
        let centerX = x - textWidth / 2;

        this.context.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        this.context.lineWidth = 8; // Default
        if (strokeWidth) {
            this.context.lineWidth = strokeWidth;
        }
        this.context.strokeText(text, centerX, y);

        this.context.fillText(text, centerX, y);
    }
}




