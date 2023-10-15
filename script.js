function sanitizeHTML(text) {
    var element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

let input = document.getElementById('inputBox');
let historyText = document.getElementById('historyText');
let clearHistoryButton = document.querySelector('.clear-history-button');
let buttons = document.querySelectorAll('button');

let currentExpression = '';
let history = '';

clearHistoryButton.addEventListener('click', () => {
    history = '';
    historyText.textContent = '';
    historyText.style.display = 'none';
});

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            if (currentExpression) {
                history += currentExpression + ' = ';
                currentExpression = eval(currentExpression).toString();
                input.value = currentExpression;
                historyText.innerHTML = sanitizeHTML(history);
                historyText.style.display = 'block';
            }
        } else if (e.target.innerHTML == 'AC') {
            currentExpression = '';
            input.value = '0';
        } else if (e.target.innerHTML == 'DEL') {
            currentExpression = currentExpression.slice(0, -1);
            input.value = currentExpression || '0';
        } else if (e.target.innerHTML == 'History') {
            if (currentExpression) {
                history += currentExpression + ' = ';
                historyText.innerHTML = sanitizeHTML(history);
                historyText.style.display = 'block';
            }
        } else {
            currentExpression += e.target.innerHTML;
            input.value = currentExpression;
        }
    });
});
