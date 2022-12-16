class Matrix {
    constructor(values = []) {
        this.values = [];
        values.forEach((arr, i) => {
            this.values.push([]);
            arr.forEach(el => this.values[i].push(el));
        });
    }

    toString() {
        return `[${this.values.map(arr => 
            arr.map(el => el.toString()).join('; ')
        ).join('|\n')}]`;
    }

    abs() {
        
    }
}