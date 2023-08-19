`strict`

// function checkDogs(dogsJulia, dogsKate) {
//     const copyJulia = [...dogsJulia];
//     copyJulia.splice(-2);
//     copyJulia.splice(0, 1);
//     const arrayOfBoth = [...copyJulia, ...dogsKate];

//     arrayOfBoth.forEach(function (value, i) {
//         if (value < 3) {
//             console.log(`Dog number ${i + 1} is a puppy and is ${value} years old!`);
//         } else {
//             console.log(`Dog number ${i + 1} is an adult and is ${value} years old!`);
//         }
//     })
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// const doubles = [1, 2, 3, 4, 5].map((el) => el * 2);
// console.log(doubles);

//////////////////////////////////////

// function calcAverageHumanAge(ages) {
//     return ages
//         .map(dogAge => dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge)
//         .filter(humanAge => humanAge >= 18)
//         .reduce((total, age, i, humanAges) => total + age / humanAges.length, 0);
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// const arr = [1, 2, 3, 4, 5];

// let three = array.find(num => num === 3);
// console.log(three);

const array = {
    arr: [1, 2, 3, 4, 5],
    find(search) {
        for (const element of this.arr) {
            if (element === search) {
                return element;
            }
        }
        return undefined;
    }
}

console.log(array.find(3));