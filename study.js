// Creating Dates 

const amount = 2354.5;
const options = {
    style: `currency`,
    currency: 'USD',
    useGrouping: false
}

const americanAmount = new Intl.NumberFormat('en-US', options).format(amount);
const britishAmount = new Intl.NumberFormat('ru-RU', options).format(amount);

console.log(`US format:\t`, americanAmount);
console.log(`UK format:\t`, americanAmount);