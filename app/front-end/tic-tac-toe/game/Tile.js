export default class Tile {
    constructor(x, y, ctx, side, padding) {
        this.x = x;
        this.y = y;
        this.padding = Math.round(padding);
        this.side = side;
        this.ctx = ctx;
        this.status = 'blank';
        this.animationEnd = false

        this.ctx.lineWidth = this.side/ 30;

        this.drawBlank()

    }

    drawBlank() {
        this.ctx.clearRect(this.x , this.y, this.side, this.side);

        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.side, this.side);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath()
    }

    drawCross() {
        let cross = {
            x: this.x + this.padding,
            y: this.y + this.padding,
            position: 'left',
            speed: this.side * 3 * 0.016,
        };

        this.status = 'cross';

        this.drawBlank()

        let animation = () => {
            switch(cross.position) {
                case ('left'):
                    if (cross.x <= this.x + this.side - this.padding) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(cross.x, cross.y);
                        cross.x = cross.x + cross.speed;
                        cross.y = cross.y + cross.speed;
                        this.ctx.lineTo(cross.x, cross.y);
                        this.ctx.stroke();
                        this.ctx.closePath()

                        requestAnimationFrame(animation)
                    }
                    else {
                        cross.position = 'right';
                        cross.x = this.x + this.side - this.padding;
                        cross.y = this.y + this.padding;

                        animation();
                    }
                    break;
                case ('right'):
                    if (cross.x >= this.x + this.padding) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(cross.x, cross.y);
                        cross.x = cross.x - cross.speed;
                        cross.y = cross.y + cross.speed;
                        this.ctx.lineTo(cross.x, cross.y);
                        this.ctx.stroke();
                        this.ctx.closePath()

                        requestAnimationFrame(animation)
                    }
                    else {
                        this.animationEnd = true
                    }

            }

        };
        return animation()
    }

    drawCircle() {
        let circle = {
            x: this.x + this.side/2,
            y: this.y + this.side/2,
            radius: (this.side - this.padding) / 2,
            speed: 200 * 0.016,
            quart: Math.PI / 2,
            fullCircle: Math.PI * 2,
            percent: 0
        };

        this.status = 'circle'

        let animation = () => {
            this.drawBlank()

            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, -(circle.quart), ((circle.fullCircle) * circle.percent/100) - circle.quart, false);
            this.ctx.stroke();
            this.ctx.closePath()

            if (circle.percent < 100) {
                circle.percent = circle.percent + circle.speed;
                requestAnimationFrame(animation)
            }
            else {
                this.animationEnd = true
            }
        };

        return animation()

    }
}