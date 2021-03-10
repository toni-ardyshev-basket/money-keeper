//версия  неидеальная и неокончательная - предназначена в обучающих целях

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    mandatoryExpenses  = document.querySelectorAll('.expenses-item'),
    btnApproveOfMandatoryExpenses  = document.getElementsByTagName('button')[0],
    optionExpenses = document.querySelectorAll('.optionalexpenses-item'),
    btnApproveOfOptionExpenses = document.getElementsByTagName('button')[1],
    btnCalculation = document.getElementsByTagName('button')[2],
    incomeItem = document.querySelector('.choose-income'),
    chekcSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let totalOfTheCostOfMandatoryExpenses = 0,
    requestABudgetForTheMonth,
    requestTimeDataRequest;

window.addEventListener('load', function () {
    btnApproveOfMandatoryExpenses.disabled = true;
    btnApproveOfOptionExpenses.disabled = true;
    btnCalculation.disabled = true;

    btnApproveOfMandatoryExpenses.style.opacity = '0.6';
    btnApproveOfOptionExpenses.style.opacity = '0.6';
    btnCalculation.style.opacity = '0.6';
    chekcSavings.checked = false;
});

startBtn.addEventListener('click', function () {
    requestTimeDataRequest = prompt("Введите дату в формате YYYY-MM-DD", '2019-02-23');
    requestABudgetForTheMonth = +prompt("Ваш бюджет на месяц?" , '');

    while(isNaN(requestABudgetForTheMonth)  || requestABudgetForTheMonth === '' || requestABudgetForTheMonth == null){
        requestABudgetForTheMonth = +prompt("Ваш бюджет на месяц?" , '');
    }
    appData.timeData = requestTimeDataRequest;
    appData.budget = requestABudgetForTheMonth;

    budgetValue.textContent = requestABudgetForTheMonth.toFixed();
    yearValue.value = new Date(Date.parse(requestTimeDataRequest)).getFullYear();
    monthValue.value = new Date(Date.parse(requestTimeDataRequest)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(requestTimeDataRequest)).getDate();

    btnApproveOfMandatoryExpenses.disabled = false;
    btnApproveOfOptionExpenses.disabled = false;
    btnCalculation.disabled = false;

    btnApproveOfMandatoryExpenses.style.opacity = '1';
    btnApproveOfOptionExpenses.style.opacity = '1';
    btnCalculation.style.opacity = '1';
});

btnApproveOfMandatoryExpenses.addEventListener('click', function () {
    for(let i = 0; i < mandatoryExpenses.length; i++){
        let nameOfMandatoryExpenses = mandatoryExpenses[i].value,
            costOfMandatoryExpenses = +mandatoryExpenses[++i].value;

        if( (typeof(nameOfMandatoryExpenses)) === 'string' && (typeof(nameOfMandatoryExpenses)) != null
            && (typeof(costOfMandatoryExpenses)) != null && nameOfMandatoryExpenses !== ''
            && costOfMandatoryExpenses !== ''){
            appData.expenses[nameOfMandatoryExpenses] = costOfMandatoryExpenses;
            console.log('done');
            totalOfTheCostOfMandatoryExpenses += costOfMandatoryExpenses;
        } else {
            i = i - 1;
        }
    }
    expensesValue.textContent = totalOfTheCostOfMandatoryExpenses;
});

btnApproveOfOptionExpenses.addEventListener('click', function(){
    for(let i = 0; i < optionExpenses.length; i++) {
        let costOfOptionExpenses = optionExpenses[i].value;
        appData.optionalExpenses[i] = costOfOptionExpenses;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

btnCalculation.addEventListener('click', function () {
    if(!!appData.budget){
        appData.theBudgetForTheDay =  ((appData.budget - totalOfTheCostOfMandatoryExpenses) / 30).toFixed();
        dayBudgetValue.textContent = appData.theBudgetForTheDay;

        if(appData.theBudgetForTheDay < 500){
            levelValue.textContent = "Минимальный уровень достатка! Пора что-то менять!";
        } else if(appData.theBudgetForTheDay > 500 && appData.theBudgetForTheDay < 2000){
            levelValue.textContent =     "Средний уровень достатка. Можно и поднажать!";
        } else if(appData.theBudgetForTheDay > 500 && appData.theBudgetForTheDay < 2000){
            levelValue.textContent = "Высокий уровень достатка!";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        dayBudgetValue.textContent = "Начните расчет";
    }
});

incomeItem.addEventListener('input', function () {
    let itemsIncome = incomeItem.value;
    appData.income = itemsIncome.split(', ');
    incomeValue.textContent = appData.income;
});

chekcSavings.addEventListener('click', function () {
    if(chekcSavings.checked === true) {
        appData.savings = true;
    } else {
        appData.savings = false;
    }
});

sumValue.addEventListener('input', function () {
    if(appData.savings === true){
        let amountOfTheContribution = +sumValue.value,
            interestRateOfTheDeposit = +percentValue.value;
        appData.monthInCome = (amountOfTheContribution * interestRateOfTheDeposit / 100 / 12).toFixed(2);
        appData.yearInCome = (amountOfTheContribution * interestRateOfTheDeposit / 100).toFixed(2);

        monthSavingsValue.textContent = appData.monthInCome;
        yearSavingsValue.textContent = appData.yearInCome;
    }
});

percentValue.addEventListener('input', function () {
    if(appData.savings === true){
        let amountOfTheContribution = +sumValue.value,
            interestRateOfTheDeposit = +percentValue.value;
        appData.monthInCome = (amountOfTheContribution * interestRateOfTheDeposit / 100 / 12).toFixed(2);
        appData.yearInCome = (amountOfTheContribution * interestRateOfTheDeposit / 100).toFixed(2);

        monthSavingsValue.textContent = appData.monthInCome;
        yearSavingsValue.textContent = appData.yearInCome;
    }
});

let appData = {
    budget: requestABudgetForTheMonth,
    timeData: requestTimeDataRequest,
    expenses: {},
    optionalExpenses:  {},
    income: [],
    savings: false,
};



