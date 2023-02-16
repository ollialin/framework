class Calculator {

    getComplex(str) {
        str = str.replaceAll(' ', '').replaceAll('\n', '');
        const arr = str.split('i');
        if (arr.length === 2) {
            if (arr[0]) {
                const c = arr[0].substr(arr[0].length - 1);
                arr[0] = arr[0].slice(0, -1);
                arr[1] = !arr[1] ? 1 : arr[1];
                if (c === '-') {
                    arr[1] = c + arr[1];
                }
                return new Complex(arr[0] - 0, arr[1] - 0);
            }
            return new Complex(0, arr[1] - 0);
        }
    }

    getVector(str) {
        str = str.replaceAll(' ', '').replaceAll('\n', '');
        if (str.startsWith('(') && str.endsWith(')')) {
            str = str.slice(1, str.length - 1);
            let depth = 0;
            let substr = '';
            const values = [];
            const elements = [];
            for (let i = 0; i < str.length; i++) {
                if (str[i] === ',' && depth === 0) {
                    elements.push(substr);
                    substr = '';
                } else {
                    substr += str[i];
                    if (str[i] === '(') {
                        depth += 1;
                    }
                    if (str[i] === ')') {
                        depth -= 1;
                        if (depth < 0) return null;
                    }
                }
            }
            elements.push(substr);
            elements.forEach(el => values.push(this.getEntity(el)));
            return new Vector(values);
        }
        return null;
    }

    getMatrix(str) {
        str = str.replaceAll(' ', '').replaceAll('\n', '');
        if (str.startsWith('[') && str.endsWith(']')) {

            str = str.slice(1, str.length - 1);
            let depthLS = 0;
            let maxDepthLS = 0;
            let subrow = '';
            const values = [];
            const lines = [];
            for (let i = 0; i < str.length; i++) {
                if (str[i] === '|' && depthLS === 0) {
                    lines.push(subrow);
                    subrow = '';
                } else {
                    subrow += str[i];
                    if (str[i] === '[') {
                        depthLS += 1;
                        maxDepthLS = (depthLS > maxDepthLS) ? depthLS : maxDepthLS;
                    }
                    if (str[i] === ']') {
                        depthLS -= 1;
                    }
                }
                if (depthLS < 0) {
                    return null;
                }
            }
            lines.push(subrow); //добавление последней строки
            for (let k = 0; k < lines.length; k++) {
                let maxDepthCS = 0;
                let depthCS = 0;
                let subcol = '';
                let columns = [];
                for (let i = 0; i < lines[k].length; i++) {
                    if (lines[k][i] === ';' && depthCS === 0) {
                        columns.push(subcol);
                        subcol = '';
                    } else {
                        subcol += lines[k][i];
                        if (lines[k][i] === '[') {
                            depthCS += 1;
                            maxDepthCS = (depthCS > maxDepthCS) ? depthCS : maxDepthCS;
                        }
                        if (lines[k][i] === ']') {
                            depthCS -= 1;
                        }
                    }
                    if (depthCS < 0) {
                        return null;
                    }
                }
                columns.push(subcol);
                lines[k] = columns;
            }
            lines.forEach(
                line => {
                    const row = [];
                    line.forEach(el => row.push(this.getEntity(el)));
                    values.push(row);
                });
            return new Matrix(values);
        }
        return null;
    }

    complex(re, im) {
        return new Complex(re, im);
    }

    vector(values) {
        return new Vector(values);
    }

    matrix(values) {
        return new Matrix(values);
    }

    getEntity(str) {
        if (str.startsWith('[')) return this.getMatrix(str);
        if (str.startsWith('(')) return this.getVector(str);
        if (str.includes('i')) return this.getComplex(str);
        return this.complex(str - 0);
    }

    get(el) {
        if (el instanceof Matrix) return new MatrixCalculator(this.get(el.values[0][0]));
        if (el instanceof Vector) return new VectorCalculator(this.get(el.values[0]));
        return new ComplexCalculator();
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b);
    }

    prod(a, b) {
        return this.get(a).prod(a, b);
    }

    pow(a, b) {
        return this.get(a).pow(a, b);
    }

    zero(el) {
        const type = el ? el.constructor.name : null;
        switch (type) {
            case 'Vector':
                return this.get(this.vector()).zero(el.values.length);
            case 'Matrix':
                return this.get(this.matrix()).zero(el.values.length);
            default:
                return this.get().zero();
        }
    }

    one(el) {
        const type = el ? el.constructor.name : null;
        switch (type) {
            case 'Vector':
                return this.get(this.vector()).one(el.values.length);
            case 'Matrix':
                return this.get(this.matrix()).one(el.values.length);
            default:
                return this.get().one();
        }
    }
}