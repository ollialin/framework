class Graph3D extends Component {
    constructor(params) {
        super(params);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            FOCUS: new Point(0, 0, 30),
            CAMERA: new Point(0, 0, 50)
        }
        this.graph = new Graph({
            id: 'canvas3d',
            WIN: this.WIN,
            width: 700,
            height: 700,
            callbacks: {

            }
        });
        this.math3D = new Math3D({ WIN: this.WIN });
        this.cube = [
            new Point(10, 10, 10),
            new Point(-10, 10, 10),
            new Point(-10, -10, 10),
            new Point(10, -10, 10),
            new Point(10, 10, -10),
            new Point(-10, 10, -10),
            new Point(-10, -10, -10),
            new Point(10, -10, -10)];

        this.cubeEdges = [
            new Edge(0, 1),
            new Edge(0, 3),
            new Edge(0, 4),
            new Edge(1, 2),
            new Edge(1, 5),
            new Edge(2, 3),
            new Edge(2, 6),
            new Edge(3, 7),
            new Edge(4, 5),
            new Edge(4, 7),
            new Edge(5, 6),
            new Edge(6, 7)];
        this.renderScene();
    }
    clear() {
        this.graph.clear();
    }
    printCube() {
        this.cube.forEach(point => {
            this.graph.point(
                this.math3D.xs(point),
                this.math3D.ys(point)
            );
        });
    }
    printCubeEdges() {
        this.cubeEdges.forEach(edge => {
            this.graph.line(
                this.math3D.xs(this.cube[edge.p1]),
                this.math3D.ys(this.cube[edge.p1]),
                this.math3D.xs(this.cube[edge.p2]),
                this.math3D.ys(this.cube[edge.p2]),
                '#1a2b3c',
                2,
                false);
        })
    }
    renderScene() {
        this.clear();
        this.printCube();
        this.printCubeEdges();
    }
    addEventListener() {
        const yscale = document.getElementById("YRotation-scale");
        let degYAngle = yscale.value;
        yscale.addEventListener('input', () => {
            const radDeltaAngle = (yscale.value - degYAngle) * Math.PI / 180;
            degYAngle = yscale.value;
            this.cube.forEach(point => {
                const array = this.math3D.mult([
                    [Math.cos(radDeltaAngle), 0, -Math.sin(radDeltaAngle), 0],
                    [0, 1, 0, 0],
                    [Math.sin(radDeltaAngle), 0, Math.cos(radDeltaAngle), 0],
                    [0, 0, 0, 1]],
                    [point.x, point.y, point.z, 1])
                point.makeFromArray(array);
                //почистить код от повторов (аналогничный код для зума)
            });
            this.renderScene();
        });
    }
}