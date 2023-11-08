class Board {
    cells = [];

    constructor(lineSize, width, height, context, posDrawX, posDrawY, cellSize) {
        switch (lineSize) {
            default: // 4 en linea
                this.rows = 6;
                this.columns = 7;
                break;
            case 5:
                this.rows = 7;
                this.columns = 8;
                break;
            case 6:
                this.rows = 8;
                this.columns = 9;
                break;
            case 7:
                this.rows = 9;
                this.columns = 10;
                break;
        }
        this.lineSize = lineSize;
        this.width = width;
        this.height = height;
        this.context = context;
        this.posDrawX = posDrawX;
        this.posDrawY = posDrawY;
        this.cellSize = cellSize;
        this.columnGap = (this.width - (this.cellSize * this.columns)) / this.columns;
        this.rowGap = (this.height - (this.cellSize * this.rows)) / this.rows;
        this.initializeEmptyBoard();
    }

    getCells() {
        return this.cells;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    initializeEmptyBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j] = 0; //Llena todo el tablero con espacios vacios
            }
        }
    }

    dropChip(chip) {
        if (this.isChipOnDropZone(chip)) {
            let centerChipX = chip.getPosX() + chip.getSize()/2;
            for (let j = 0; j < this.columns; j++) {
                let nextLimit = this.posDrawX + (j + 1) * (this.cellSize + this.columnGap);
                if (centerChipX < nextLimit) {

                    return this.dropChipByColumn(j, chip);
                }
            }
        }
        return false;
    }

    dropChipByColumn(column, chip) {
        for (let i = this.rows - 1; i >= 0; i--) {
            if (this.cells[i][column] === 0) {
                this.cells[i][column] = chip;
                chip.setPosition(this.posDrawX + (column * this.cellSize) + (column * this.columnGap) + this.columnGap/2
                - Math.abs(this.cellSize/2 - chip.getSize()/2)
                , this.posDrawY + (i * this.cellSize) + (i * this.rowGap) + this.rowGap/2
                - Math.abs(this.cellSize/2 - chip.getSize()/2)
                );
                chip.setMovable(false);
                return true;
            }
        }
        return false;
    }

    getCell(i, j) {
        return this.cells[i][j];
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

        this.drawCells();
    }

    drawCells() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let x = this.posDrawX + (this.columnGap / 2) + (this.cellSize / 2);// Determinamos el padding en ancho 
                let y = this.posDrawY + (this.rowGap / 2) + (this.cellSize / 2); // Determinamos el padding en alto
                if (this.cells[i][j] === 0) {
                    this.drawEmptyCell(x + (j * this.cellSize) + (j * this.columnGap), y + (i * this.cellSize) + (i * this.rowGap));
                } else {
                    let c = this.cells[i][j];
                    c.draw();
                }
            }
        }
    }

    isChipOnDropZone(chip) {
        let centerChipX = chip.getPosX() + chip.getSize()/2;
        let centerChipY = chip.getPosY() + chip.getSize()/2;

        let topDropZoneY = this.posDrawY - this.cellSize - this.rowGap; // LInea superior de la drop zone
        let rightDropZoneX = this.posDrawX + this.width;

        if ((centerChipY < this.posDrawY) && (centerChipY > topDropZoneY) && (centerChipX > this.posDrawX) && (centerChipX < rightDropZoneX)) {
            return true;
        }
        return false;
    }

    drawEmptyCell(x, y) {
        this.context.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.context.strokeStyle = "rgba(0, 0, 0, 0.4)"; // Color del borde
        this.context.lineWidth = 2; // Ancho del borde
    
        let radius = this.cellSize / 2; // Radio de la celda
    
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2); // Dibuja un círculo
        this.context.closePath();
    
        this.context.fill(); // Rellena el círculo
        this.context.stroke(); // Dibuja el borde
    }
    
    hasEmptyCells() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.cells[i][j] === 0) {
                    return true;
                }
            }
        }
        return false;
    }

    hasAWinner() {
        // Comprobar filas
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j <= this.columns - this.lineSize; j++) {
                let count = 0;
                let currentChip = this.cells[i][j]; 
                if (currentChip != 0) {
                    let lineCoords = [];
                    for (let k = j; k < j + this.lineSize; k++) {
                        if ((this.cells[i][k] != 0) && (this.cells[i][k].equals(currentChip))) {
                            lineCoords.push({posI: i, posJ: k});
                            count++;
                        } else {
                            count = 0;
                            lineCoords = [];
                            break;
                        }
                    }
                    if (count === this.lineSize) {
                        return lineCoords;
                    }
                }
            }
        }
    
        // Comprobar columnas
        for (let j = 0; j < this.columns; j++) {
            for (let i = 0; i <= this.rows - this.lineSize; i++) {
                let count = 0;
                let currentChip = this.cells[i][j];
                if (currentChip != 0) {
                    let lineCoords = [];
                    for (let k = i; k < i + this.lineSize; k++) {
                        if ((this.cells[k][j] != 0) && (this.cells[k][j].equals(currentChip))) {
                            lineCoords.push({posI: k, posJ: j});
                            count++;
                        } else {
                            count = 0;
                            lineCoords = [];
                            break;
                        }
                    }
                    if (count === this.lineSize) {
                        return lineCoords;
                    }
                }
            }
        }
    
        // Comprobar diagonales hacia la derecha
        for (let i = 0; i <= this.rows - this.lineSize; i++) {
            for (let j = 0; j <= this.columns - this.lineSize; j++) {
                let count = 0;
                let currentChip = this.cells[i][j];
                if (currentChip != 0) {
                    let lineCoords = [];
                    for (let k = 0; k < this.lineSize; k++) {
                        if ((this.cells[i + k][j + k] != 0) && (this.cells[i + k][j + k].equals(currentChip))) {
                            lineCoords.push({posI: i + k, posJ: j + k});
                            count++;
                        } else {
                            count = 0;
                            lineCoords = [];
                            break;
                        }
                    }
                    if (count === this.lineSize) {
                        return lineCoords;
                    }
                }
            }
        }
    
        // Comprobar diagonales hacia la izquierda
        for (let i = 0; i <= this.rows - this.lineSize; i++) {
            for (let j = this.lineSize - 1; j < this.columns; j++) {
                let count = 0;
                let currentChip = this.cells[i][j];
                if (currentChip != 0) {
                    let lineCoords = [];
                    for (let k = 0; k < this.lineSize; k++) {
                        if ((this.cells[i + k][j - k] != 0) && (this.cells[i + k][j - k].equals(currentChip))) {
                            lineCoords.push({posI: i + k, posJ: j - k});
                            count++;
                        } else {
                            count = 0;
                            lineCoords = [];
                            break;
                        }
                    }
                    if (count === this.lineSize) {
                        return lineCoords;
                    }
                }
            }
        }
    
        return null;
    }


}
