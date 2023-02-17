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
                3,
                false);
        })
    }
    renderScene() {
        this.clear();
        this.printCubeEdges();
        this.printCube();
    }
    addEventListener() {
        let canMove = false;
        document.getElementById('canvas3d').addEventListener('wheel', (event) => {
            const delta = 1 + event.wheelDelta / 1200;
            console.log(delta);
            this.cube.forEach(point => {
                this.math3D.zoom(delta, point);
                console.log(point);
            });
            this.renderScene();
        })
        document.getElementById('canvas3d').addEventListener('mouseleave', () => canMove = false);
        document.getElementById('canvas3d').addEventListener('mousedown', () => canMove = true);
        document.getElementById('canvas3d').addEventListener('mouseup', () => canMove = false);
        document.getElementById('canvas3d').addEventListener('mousemove', (event) => {
            if (canMove) {
                const { movementX, movementY } = event;
                this.rotateY(movementX / 180);
                this.rotateX(movementY / 180);
                this.renderScene();
            }
        });
    }
    rotateY(deltaAngle) {
        this.cube.forEach(point => {
            const array = this.math3D.mult([
                [Math.cos(deltaAngle), 0, -Math.sin(deltaAngle), 0],
                [0, 1, 0, 0],
                [Math.sin(deltaAngle), 0, Math.cos(deltaAngle), 0],
                [0, 0, 0, 1]],
                [point.x, point.y, point.z, 1]);
            point.makeFromArray(array);
        });
    }
    rotateX(deltaAngle) {
        this.cube.forEach(point => {
            const array = this.math3D.mult([
                [1, 0, 0, 0],
                [0, Math.cos(deltaAngle), Math.sin(deltaAngle), 0],
                [0, -Math.sin(deltaAngle), Math.cos(deltaAngle), 0],
                [0, 0, 0, 1]],
                [point.x, point.y, point.z, 1]);
            point.makeFromArray(array);
        });
    }
}