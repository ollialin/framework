class Vector {
    constructor(values = []) {
        this.values = [];
        values.forEach(e => this.values.push(e));
    }

    toString() {
        return `(${this.values.map(el => el.toString()).join(', ')})`;
    }

    abs() {
        this.calc = Calculator.prototype.get(this.values[0]);
        let sqd = this.calc.zero();
        this.values.forEach(e => {
            const p = this.calc.pow(e.abs(), 2);
            sqd = this.calc.add(sqd, p);
        });
        delete this.calc;
        return Math.sqrt(sqd);
    }
}