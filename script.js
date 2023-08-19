'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/// BANKIST APP ///
// Data


const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
const displayMovements = function (movements) {
	containerMovements.innerHTML = ``;
	movements.forEach(function (mov, i) {
		const type = mov > 0 ? `deposit` : `withdrawal`;

		const html = `
		<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
		`;
		containerMovements.insertAdjacentHTML("afterbegin", html);
		console.log(mov);
	})
}

const createUserNames = function (accs) {
	accs.forEach(function (acc) {
		acc.username = acc.owner
			.toLowerCase()
			.split(" ")
			.map(el => el[0])
			.join("");
	})
}
createUserNames(accounts);

const calcBalance = function (movements) {
	const balance = movements.reduce((total, el) => total + el, 0);
	labelBalance.textContent = `${balance}€`;
}

const calcDisplaySummary = function (movements, interestRate) {
	const depositsIn = movements
		.filter(movement => movement > 0)
		.reduce((total, deposit) => total + deposit, 0);

	const withdrawalsOut = movements
		.filter(movement => movement < 0)
		.reduce((total, withdrawal) => total + withdrawal, 0);

	labelSumIn.textContent = `${depositsIn}€`;
	labelSumOut.textContent = `${Math.abs(withdrawalsOut)}€`;

	// const interestRate = 0.012; // 1.1%
	const interest = movements
		.filter(movement => movement > 0)
		.map(deposit => deposit * interestRate)
		.reduce((interestTotal, interestSingle) => interestTotal + interestSingle, 0);
	labelSumInterest.textContent = `${interest}€`;
}

const updateUI = function (currentAccnt) {
	// Display movements
	displayMovements(currentAccnt.movements);
	// Display balance
	calcBalance(currentAccnt.movements);
	// Display summary
	calcDisplaySummary(currentAccnt.movements, currentAccnt.interestRate);
}

let currentAccount;

btnLogin.addEventListener(`click`, function (event) {
	event.preventDefault();
	currentAccount = accounts.find(account => account.username === inputLoginUsername.value);
	if (Number(inputLoginPin.value) === currentAccount?.pin) {
		inputLoginPin.value = inputLoginUsername.value = ``;
		inputLoginPin.blur();
		updateUI(currentAccount);
		// Display UI and Welcome message!
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(` `)[0]}`;
		containerApp.style.opacity = 1;
	} else {
		alert(`Wrong username or/and password!`);
	}
})

btnTransfer.addEventListener(`click`, function (event) {
	event.preventDefault();
	const receiver = accounts.find(account => account.username === inputTransferTo.value);
	const moneyOut = Number(inputTransferAmount.value);

	if (!receiver) {
		alert(`Unknown recipient`);
	} else if (moneyOut > parseInt(labelBalance.textContent)) {
		alert(`Not enough funds!`);
	} else if (moneyOut <= 0) {
		alert(`Amount of money needs to be positive!`);
	} else if (receiver === currentAccount) {
		alert(`Cannot transfer funds to yourself!`);
	} else {
		receiver.movements.push(moneyOut);
		currentAccount.movements.push(-moneyOut);
		updateUI(currentAccount);
		inputTransferTo.value = inputTransferAmount.value = ``;
	}
})

btnClose.addEventListener("click", function (event) {
	event.preventDefault();
	if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
		const myIndex = accounts.indexOf(currentAccount);
		accounts.splice(myIndex, 1);
		containerApp.style.opacity = 0;
		labelWelcome.textContent = `Log in to get started`;
		alert("Your account was deleted!");
	} else {
		alert(`Provided details are not correct!`);
	}
})

btnLoan.addEventListener(`click`, function (event) {
	event.preventDefault();
	const loanRequest = Number(inputLoanAmount.value);
	if (loanRequest > 0 && currentAccount.movements.some(mov => mov >= loanRequest * 0.1)) {
		currentAccount.movements.push(loanRequest);
		updateUI(currentAccount);
		inputLoanAmount.value = ``;
		inputLoanAmount.blur();
	} else {
		if (loanRequest <= 0) {
			alert(`The amount should be more than 0!`);
		} else {
			alert(`You are not eligible for the loan!`);
		}
	}
})

let sorted = false;
btnSort.addEventListener(`click`, function (event) {
	currentAccount.sortedMovements = [...currentAccount.movements].sort((a, b) => a - b);

	if (sorted) {
		displayMovements(currentAccount.movements);
		sorted = false;
	} else {
		displayMovements(currentAccount.sortedMovements);
		sorted = true;
	}
})




