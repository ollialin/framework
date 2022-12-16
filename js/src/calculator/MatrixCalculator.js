class MatrixCalculator extends RealCalculator {

    constructor(calc = new ComplexCalculator) {
        super();
        this.calc = calc;
    }

    add(a, b) {
        return new Matrix(a.values.map((arr, i) => arr.map((el, j) => this.calc.add(el, b.values[i][j]))));
    }
    sub(a, b) {
        return new Matrix(a.values.map((arr, i) => arr.map((el, j) => this.calc.sub(el, b.values[i][j]))));
    }

    mult(a, b) {
        const length = a.values.length;
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                let s = Calculator.prototype.zero(a.values[i][j]);
                for (let k = 0; k < length; k++) {
                    s = this.calc.add(s, this.calc.mult(a.values[k][j], b.values[i][k]));
                }
                values[i][j] = s;
            }
        }
        return new Matrix(values);
    }

    prod(a, p) {
        return new Matrix(a.values.map(arr => arr.map(el => this.calc.prod(el, p))));
    }
    pow(a, p) {
        let c = this.one(a.values.length, a.values[0]);
        for (let i = 0; i < p; i++) {
            c = this.mult(c, a); //c и a можно менять местами
            //произведение коммутативно для матриц возведенных в степень, т.к. произведение ассоциативно
            //AAA=(AA)A=A(AA)=A³
        }
        return c;
    }
    one(length, elem) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = (i === j) ? this.calc.one(elem) : this.calc.zero(elem);
            }
        }
        return new Matrix(values);
    }

    zero(length, elem) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero(elem);
            }
        }
        return new Matrix(values);
    }
}