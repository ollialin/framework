class Graph {
    constructor({ id, width = 500, height = 500, WIN, callbacks }) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');

        this.canvas.width = width;
        this.canvas.height = height;

        this.WIN = WIN;
        const { wheel, mouseup, mousedown, mousemove, mouseleave } = callbacks;

        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousedown', mousedown);
        this.canvas.addEventListener('mouseup', mouseup);
        this.canvas.addEventListener('mousemove', mousemove);
        this.canvas.addEventListener('mouseleave', mouseleave);
    }
    xs(x) { return (x - this.WIN.LEFT) * this.canvas.width / this.WIN.WIDTH }
    ys(y) { return (this.WIN.HEIGHT + this.WIN.BOTTOM - y) * this.canvas.height / this.WIN.HEIGHT; }

    sx(x) { return x * this.WIN.WIDTH / this.canvas.width; }
    sy(y) { return -y * this.WIN.HEIGHT / this.canvas.height; }

    clear() {
        this.context.fillStyle = '#fafafa';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    line(x1, y1, x2, y2, color = '#000', width = 3, isDashed = false) {
        this.context.beginPath();
        this.context.lineWidth = width;
        if (isDashed) {
            this.context.setLineDash([10, 10]);
        } else {
            this.context.setLineDash([]);
        }
        this.context.strokeStyle = color;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
        this.context.closePath();
        this.context.setLineDash([]);
    }
    point(x, y, color = '#1a2b3c', size = 3) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }
    text(x, y, text, color = "black", font = "12px sans-serif", align = "center") {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.textAlign = align;
        this.context.fillText(text, this.xs(x), this.ys(y));
    }
    polygon(points = [], color = 'blue', width = 2) {
        if (points.length >= 3) {

            this.context.beginPath();
            this.context.lineWidth = width;
            this.context.strokeStyle = color;
            this.context.fillStyle = color + '40';
            this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
            }
            this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
            this.context.fill();
            this.context.closePath();
            this.context.stroke();
        }
    }
}