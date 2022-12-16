class Target extends Component {

    singleShot(x, y) {
        if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) return -1;
        return (this.shootCenter(x, y) ||
            this.shootAstroid(x, y) ||
            this.shootRhombus(x, y) ||
            this.shootCircle(x, y) ||
            this.shootSquare(x, y) || 0);
    }
    multiShot(amount = 1, min, max) {
        amount = amount ? amount - 0 : 1;
        min = (min !== '') ? min - 0 : -1;
        max = (max !== '') ? max - 0 : 1;
        if (isNaN(amount) || isNaN(min) || isNaN(max) || amount < 1 || max < min) return -1;
        let score = 0;
        for (let i = 0; i < amount; i++) {
            const x = Math.random() * (max - min) + min;
            const y = Math.random() * (max - min) + min;
            score += this.singleShot(x, y);
        }
        return score;
    }
    shootCenter(x, y) {
        return (x === 0 && y === 0) ? 10 : 0;
    }
    shootAstroid(x, y) {
        return (Math.pow(x * x, 1 / 3) + Math.pow(y * y, 1 / 3) <= 1) ? 4 : 0;
    }
    shootRhombus(x, y) {
        return (Math.abs(x) + Math.abs(y) <= 1) ? 3 : 0;
    }
    shootCircle(x, y) {
        return (x * x + y * x <= 1) ? 2 : 0;
    }
    shootSquare(x, y) {
        return (Math.abs(x) <= 1 && Math.abs(y) <= 1) ? 1 : 0;
    }
    addEventListener() {
        document.getElementById('target-button').addEventListener('click', () => {
            const min = document.getElementById('target-min').value;
            const max = document.getElementById('target-max').value;
            const amount = document.querySelector('#target-amount').value;
            document.getElementById('target-result').innerHTML = `Результат: ${this.multiShot(amount, min, max)}`;
        });
    }
}