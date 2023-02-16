class Graph3D extends Component {
    constructor(params) {
        super(params);
        // console.log(params.id);
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
            callbacks: null
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
        this.renderScene();
    }
    clear() {
        this.graph.clear();
    }
    // printCube() {
    //     this.cube.forEach(point => this.graph.point(
    //         this.math3D.xs(point),
    //         this.math3D.ys(point)
    //     ));
    // }
    printCube() {
        this.cube.forEach(point => {
            this.graph.point(
                this.math3D.xs(point),
                this.math3D.ys(point)
            )
        });
    }
    renderScene() {
        console.log("rendering")
        this.clear();
        this.printCube();
    }
    addEventListener() {
        document.getElementById("rotate-right").addEventListener('click', () => {
            this.cube.forEach(point => {
                const array = this.math3D.mult([
                    [Math.cos(0.261799), 0, -Math.sin(0.261799), 0],
                    [0, 1, 0, 0],
                    [Math.sin(0.261799), 0, Math.cos(0.261799), 0],
                    [0, 0, 0, 1]],
                    [point.x, point.y, point.z, 1])
                point.x=array[0];
                point.y=array[1];
                point.z=array[2];
            });
            this.renderScene();
        });
    }
}