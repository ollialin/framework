class VectorCalculator extends RealCalculator {

    constructor(calc = new ComplexCalculator) {
        super();
        this.calc = calc;
    }

    div() { return null; }

    add(a, b) {
        return new Vector(a.values.map((el, i) => this.calc.add(el, b.values[i])));
    }

    sub(a, b) {
        return new Vector(a.values.map((el, i) => this.calc.sub(el, b.values[i])));
    }

    mult(a, b) {
        if (a.values.length === 3 || b.values.length === 3) {
            return new Vector([
                this.calc.sub(this.calc.mult(a.values[1], b.values[2]), this.calc.mult(a.values[2], b.values[1])),
                this.calc.sub(this.calc.mult(a.values[2], b.values[0]), this.calc.mult(a.values[0], b.values[2])),
                this.calc.sub(this.calc.mult(a.values[0], b.values[1]), this.calc.mult(a.values[1], b.values[0]))
            ]);
        }
        return null;
    }

    prod(a, s) {
        return new Vector(a.values.map(e => this.calc.prod(e, s)));
    }

    pow(a, p) {
        let c = this.one(3);
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(new Complex(1 / Math.sqrt(length)));
        }
        return new Vector(values);
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.calc.zero());
        }
        return new Vector(values);
    }    
}