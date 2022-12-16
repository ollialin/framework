function calculate() {
    function operandHandler(e) {
        const calc = new Calculator();
        const num1 = document.getElementById('calc-num1');
        const num2 = document.getElementById('calc-num2');
        const a = calc.getEntity(num1.value);
        const b = calc.getEntity(num2.value);
        const operand = e.target.dataset.operand;
        const c = calc[operand](a, b);
        document.getElementById('calc-result').innerHTML = (c) ? c.toString() : 'Ошибка';
    }
    document.querySelectorAll('.calc-op').forEach(e => e.addEventListener('click', operandHandler));
}