//переписать нули и единицы

class ComplexCalculator extends RealCalculator {
    add(a, b) {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a, b) {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a, b) {

        return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
    }

    div(a, b) {
        const m = b.re * b.re + b.im * b.im;
        if (m === 0) return null;
        return new Complex(
            (a.re * b.re + a.im * b.im) / m,
            (a.im * b.re - a.re * b.im) / m
        );
    }

    prod(a, s) { return new Complex(a.re * s, a.im * s) }

    pow(a, p) {
        let c = this.one();
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one() { return new Complex(1); }

    zero() { return new Complex(); }
}
