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
	movementsDates: [
		'2022-11-18T21:31:17.178Z',
		'2022-12-23T07:42:02.383Z',
		'2023-01-28T09:15:04.904Z',
		'2023-04-01T10:17:24.185Z',
		'2023-08-08T14:11:59.604Z',
		'2023-08-14T17:01:17.194Z',
		'2023-08-18T23:36:17.929Z',
		'2023-08-19T10:51:36.790Z',
	],
	currency: 'EUR',
	locale: 'pt-PT', // de-DE
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
	movementsDates: [
		'2022-11-01T13:15:33.035Z',
		'2022-11-30T09:48:16.867Z',
		'2022-12-25T06:04:23.907Z',
		'2023-01-25T14:18:46.235Z',
		'2023-02-05T16:33:06.386Z',
		'2023-04-10T14:43:26.374Z',
		'2023-06-25T18:49:59.371Z',
		'2023-07-26T12:01:20.894Z',
	],
	currency: 'USD',
	locale: 'en-US',
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
	movementsDates: [
		'2022-11-18T21:31:17.178Z',
		'2022-12-23T07:42:02.383Z',
		'2023-01-28T09:15:04.904Z',
		'2023-04-01T10:17:24.185Z',
		'2023-05-08T14:11:59.604Z',
		'2023-05-27T17:01:17.194Z',
		'2023-07-11T23:36:17.929Z',
		'2023-07-12T10:51:36.790Z',
	],
	currency: 'EUR',
	locale: 'pt-PT', // de-DE
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
	movementsDates: [
		'2022-11-01T13:15:33.035Z',
		'2022-11-30T09:48:16.867Z',
		'2022-12-25T06:04:23.907Z',
		'2023-01-25T14:18:46.235Z',
		'2023-02-05T16:33:06.386Z'
	],
	currency: 'USD',
	locale: 'en-US',
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
const displayDaysPassed = function (time1, time2 = new Date()) {
	return Math.abs(time1 - time2) / (1000 * 60 * 60 * 24);
}

const calculateDisplayDate = function (date, acc) {
	let displayDate;
	if (displayDaysPassed(date) <= 1) {
		displayDate = `today`;
	} else if (displayDaysPassed(date) <= 2) {
		displayDate = `yesterday`;
	} else if (displayDaysPassed(date) <= 3) {
		displayDate = `2 days ago`;
	} else if (displayDaysPassed(date) <= 7) {
		displayDate = `a week ago`;
	} else if (displayDaysPassed(date) <= 14) {
		displayDate = `2 week ago`;
	} else {
		displayDate = Intl.DateTimeFormat(acc.locale).format(date);
	}
	return displayDate;
}

// const fullDateSpring = function (passedDate) {
// 	const day = `${passedDate.getDate()}`.padStart(2, '0');
// 	const month = `${passedDate.getMonth() + 1}`.padStart(2, '0');
// 	const year = passedDate.getFullYear();
// 	const hour = `${passedDate.getHours()}`.padStart(2, '0');
// 	const minute = `${passedDate.getMinutes()}`.padStart(2, '0');
// 	return `${day}/${month}/${year}, ${hour}:${minute}`;

// }

const displayMovements = function (acc, toBeSorted = false) {
	containerMovements.innerHTML = ``;
	let moves;
	if (!toBeSorted) {
		moves = acc.movements;
	} else {
		moves = acc.sortedMovements;
	}
	moves.forEach(function (mov, i) {
		const type = mov > 0 ? `deposit` : `withdrawal`;
		const date = new Date(acc.movementsDates[acc.movements.indexOf(mov)]);
		// const day = `${date.getDate()}`.padStart(2, '0');
		// const month = `${date.getMonth() + 1}`.padStart(2, '0');
		// const year = date.getFullYear();
		// const hour = `${date.getHours()}`.padStart(2, '0');
		// const minute = `${date.getMinutes()}`.padStart(2, '0');
		// const displayDate = calculateDisplayDate(date, day, month, year);
		const options = {
			style: `currency`,
			currency: `EUR`
		}
		const displayDate = calculateDisplayDate(date, acc);
		const formattedMov = new Intl.NumberFormat(acc.locale, options).format(mov);
		const html = `
		<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
		  <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}€</div>
        </div>
		`;
		containerMovements.insertAdjacentHTML("afterbegin", html);
		console.log(mov);
	})

	document.querySelectorAll(`div.movements__type--deposit + div.movements__date`).forEach(tag => {
		tag.style.paddingLeft = '64px';
	})
	document.querySelectorAll(`div.movements__type--withdrawal + div.movements__date`).forEach(tag => {
		tag.style.paddingLeft = '32px';
	})
	const options = {
		year: `numeric`,
		month: `numeric`,
		day: `numeric`,
		hour: `numeric`,
		minute: `numeric`
	}
	labelDate.textContent = Intl.DateTimeFormat(acc.locale, options).format(new Date());
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

const calcBalance = function (crntAcc) {
	const balance = crntAcc.movements.reduce((total, el) => total + el, 0);
	// labelBalance.textContent = `${balance.toFixed(2)}€`;
	const options = {
		style: `currency`,
		currency: `EUR`,
	}
	const formattedBalance = new Intl.NumberFormat(currentAccount.locale, options).format(balance);
	labelBalance.textContent = formattedBalance;
}

const calcDisplaySummary = function (acct) {
	const depositsIn = acct.movements
		.filter(movement => movement > 0)
		.reduce((total, deposit) => total + deposit, 0);

	const withdrawalsOut = acct.movements
		.filter(movement => movement < 0)
		.reduce((total, withdrawal) => total + withdrawal, 0);

	// labelSumIn.textContent = `${depositsIn.toFixed(2)}€`;
	// labelSumOut.textContent = `${Math.abs(withdrawalsOut).toFixed(2)}€`;
	const options = {
		style: `currency`,
		currency: `EUR`
	}
	const formattedDepositsIn = new Intl.NumberFormat(acct.locale, options).format(depositsIn);
	const formattedWithdrawalsOut = new Intl.NumberFormat(acct.locale, options).format(withdrawalsOut);
	labelSumIn.textContent = formattedDepositsIn;
	labelSumOut.textContent = formattedWithdrawalsOut;

	const interest = acct.movements
		.filter(movement => movement > 0)
		.map(deposit => deposit * acct.interestRate)
		.reduce((interestTotal, interestSingle) => interestTotal + interestSingle, 0);
	// labelSumInterest.textContent = `${interest.toFixed(2)}€`;
	const formattedInterest = new Intl.NumberFormat(acct.locale, options).format(interest);
	labelSumInterest.textContent = formattedInterest;
}

const updateUI = function (currentAccnt) {
	// Display movements
	displayMovements(currentAccnt);
	// Display balance
	calcBalance(currentAccnt);
	// Display summary
	calcDisplaySummary(currentAccnt);
}

let sorted = false;
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
		receiver.movementsDates.push(new Date().toISOString())
		currentAccount.movements.push(-moneyOut);
		currentAccount.movementsDates.push(new Date().toISOString())
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
	const loanRequest = Math.floor(inputLoanAmount.value);
	if (loanRequest > 0 && currentAccount.movements.some(mov => mov >= loanRequest * 0.1)) {
		currentAccount.movements.push(loanRequest);
		currentAccount.movementsDates.push(new Date().toISOString());
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

btnSort.addEventListener(`click`, function (event) {
	currentAccount.sortedMovements = [...currentAccount.movements].sort((a, b) => a - b);

	if (sorted) {
		displayMovements(currentAccount);
		sorted = false;
	} else {
		displayMovements(currentAccount, true);
		sorted = true;
	}
})




