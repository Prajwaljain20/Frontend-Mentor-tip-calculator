const tips = document.querySelectorAll('.tip');
const inputs = document.querySelectorAll('input');
const reset = document.querySelector('button');
const amounts = document.querySelectorAll('.amount');
const error = document.querySelector('.error');
let errorDisplayed = true;
let tipSelected = 0;
tips.forEach(tip => {
    tip.addEventListener('click', () => {
        if (tip.classList.contains('tip-selected')) {
            tip.classList.remove('tip-selected');
            tipSelected = 0;
        } else {
            tips.forEach(tip => {
                tip.classList.remove('tip-selected');
                tipSelected = 0;
            });
            tip.classList.add('tip-selected');
            tipSelected = +tip.textContent.split('%')[0];
        }
        displayResult();
    });
});
const dot = [true, true, true];
const inputNumber = (key, index) => {
    if (inputs[index].value.indexOf('.') !== -1 ) {
        dot[index] = false;
    } else {
        dot[index] = true;
    }
    if (key.charCode === 46 && dot[index]) {
        return true;
    }
    if (key.charCode > 47 && key.charCode < 58 ) {
        return true;
    }
    return false;
};
inputs[1].addEventListener('input', () => {
    if (inputs[1].value.length !== 0) {
        tips.forEach(tip => {
            tip.classList.remove('tip-selected');
            tipSelected = 0;
        });
    }
});
inputs[2].addEventListener('input', () => {
    if (+inputs[2].value === 0) {
        error.style.display = 'block';
        errorDisplayed = true;
    } else {
        error.style.display = 'none';
        errorDisplayed = false;
    }
});
inputs.forEach(input => {
    input.addEventListener('input', () => {
       displayResult();
    });
});
reset.addEventListener('click', () => {
    amounts.forEach(amount => {
        amount.innerHTML = '$0.00';
    })
    inputs.forEach(input => {
        input.value = '';
    })
    tips.forEach(tip => {
        tip.classList.remove('tip-selected');
        tipSelected = 0;
    });
});
const isCalculationCorrect = (billPerPerson, tipPerPerson) => {
    if (!errorDisplayed) {
        if (billPerPerson === NaN || billPerPerson === Infinity || tipPerPerson === NaN || tipPerPerson === Infinity) {
            return false;
        } else {
            return true;
        }
    }
    return false;
};
const displayResult = () => {
    const billAmount = +inputs[0].value;
    const people = +inputs[2].value;
    let totalTip = tipSelected !== 0 ? tipSelected : +inputs[1].value;
    let tipPerPerson = billAmount * (totalTip/100) / people;
    let billPerPerson = (billAmount + billAmount * (totalTip/100)) / people;
    console.log(tipPerPerson, billPerPerson);
    if (isCalculationCorrect(billPerPerson, tipPerPerson)) {
        billPerPerson = billPerPerson === 0 ? '$0.00' : '$'.concat((Math.ceil(billPerPerson * 100)) / 100);
        tipPerPerson = tipPerPerson === 0 ? '$0.00' : '$'.concat((Math.ceil(tipPerPerson * 100)) / 100);
        amounts[0].innerHTML = tipPerPerson;
        amounts[1].innerHTML = billPerPerson;
    }
};
