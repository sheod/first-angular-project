import Tile from './Tile';

export default class Game {
    constructor(players) {
        this.players = players
        this.__createGame();
        this.__newGame()
    }
    __createGame() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = 600;

        this.canvas.id = "tic-tac-toe";
        this.tileCount = 8;
        this.victory = 4;

        this.tiles = [];
        this.tileMargin = this.canvas.width / this.tileCount / 10;
        this.tilePadding = this.canvas.width / this.tileCount / 6;
        this.tileSide = Math.round(((this.canvas.width - this.tileMargin * (this.tileCount + 1)) / this.tileCount));

        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = 'white';
        this.ctx.lineCap = 'round';

        this.clickOnCanvas = this.__click.bind(this)
    }

    __click() {
        let mouseX = window.event.clientX - this.canvas.offsetLeft;
        let mouseY = window.event.clientY - this.canvas.offsetTop;

        for (let r = 0; r < this.tileCount; r++) {

            for (let c = 0; c < this.tileCount; c++) {

                if (mouseX > this.tiles[r][c].x && mouseX < this.tiles[r][c].x + this.tileSide && mouseY < this.tiles[r][c].y + this.tileSide && mouseY > this.tiles[r][c].y) {

                    if (this.tiles[r][c].status === 'blank') {
                        for (let i = 0; i < this.players.length; i++) {
                            this.__whoseTurn(r, c, this.players[i]);
                        }
                    }

                }

            }
        }
    }

    __whoseTurn(r, c, player) {
        if (player.turn === true) {

            switch (player.figure) {
                case ('cross'):
                    this.tiles[r][c].drawCross();
                    break;
                case ('circle'): {
                    this.tiles[r][c].drawCircle();
                    break;
                }
            }

            this.__checkVictory(r, c, player)

            let check = () => {
                if (this.victory <= player.winningTilesArray.length) {
                    this.canvas.removeEventListener('click', this.clickOnCanvas);

                    if (this.tiles[r][c].animationEnd === true) {
                        console.log(`Победил - ${player.name}`)
                        this.__newGame()
                    }
                    else {
                        requestAnimationFrame(check)
                    }
                }
            }

            player.turn = false;

            return check()
        }
        else {
            player.turn = true;
        }
    }

    __checkVictory(r, c, player) {
        player.winningTilesArray = [this.tiles[r][c]]
        // winning check
        //row
        for (let j = 1; j < this.victory; j++) {
            if (c - j >= 0) {
                if (this.tiles[r][c - j].status === player.figure) {
                    player.winningTilesArray.push(this.tiles[r][c - j]);
                }

            }
            if (c + j < this.tileCount) {
                if (this.tiles[r][c + j].status === player.figure) {
                    player.winningTilesArray.push(this.tiles[r][c + j]);
                }

            }
        }

        if (player.winningTilesArray.length < this.victory) {
            player.winningTilesArray = [this.tiles[r][c]];

        }
        //

        //column

        for (let j = 1; j < this.victory; j++) {
            if (r - j >= 0) {
                if (this.tiles[r - j][c].status === player.figure) {
                    player.winningTilesArray.push(this.tiles[r - j][c]);
                }
                else {
                    break;
                }
            }
        }

        for (let j = 1; j < this.victory; j++) {
            if (r + j < this.tileCount) {
                if (this.tiles[r + j][c].status === player.figure) {
                    player.winningTilesArray.push(this.tiles[r + j][c]);
                }
                else {
                    break;
                }
            }
        }


        if (player.winningTilesArray.length < this.victory) {
            player.winningTilesArray = [this.tiles[r][c]];
        }

        //

        for (let j = 1; j < this.victory; j++) {
            if (r - j >= 0 && c - j >= 0) {
                if (this.tiles[r - j][c - j].status === player.figure) {
                    player.winningTilesArray.push(this.tiles[r +-j][c - j]);
                }
                else {
                    break;
                }
            }
        }

        for (let j = 1; j < this.victory; j++) {
            if (r + j < this.tileCount && c + j < this.tileCount) {
                if (this.tiles[r + j][c + j].status === player.figure) {
                    player.winningTilesArray.push(this.tiles[r + j][c + j]);
                }
                else {
                    break;
                }
            }
        }

        if (player.winningTilesArray.length < this.victory) {
            player.winningTilesArray = [this.tiles[r][c]];
        }

        //
        for (let j = 1; j < this.victory; j++) {
            if (r + j < this.tileCount && c - j >= 0) {
                if (this.tiles[r + j][c - j].status === player.figure) {
                    player.winningTilesArray.push(this.tiles[r + j][c - j]);
                }
                else {
                    break;
                }
            }
        }

        for (let j = 1; j < this.victory; j++) {
            if (r - j >= 0 && c + j < this.tileCount) {
                if (this.tiles[r - j][c + j].status === player.figure) {
                    player.winningTilesArray.push(this.tiles[r - j][c + j]);
                }
                else {
                    break;
                }
            }
        }
        if (player.winningTilesArray.length < this.victory) {
            player.winningTilesArray = [this.tiles[r][c]];
        }


    }

    __newGame () {
        this.canvas.addEventListener('click', this.clickOnCanvas);
        for (let r = 0; r < this.tileCount; r++)
        {
            this.tiles[r] = [];
            for (let c = 0; c < this.tileCount; c++)
            {
                let x = Math.round( c *(this.tileSide + this.tileMargin) + this.tileMargin );
                let y = Math.round( r *(this.tileSide + this.tileMargin) + this.tileMargin );

                this.tiles[r][c] = new Tile(x, y, this.ctx, this.tileSide, this.tilePadding);
            }
        }
    }

}
