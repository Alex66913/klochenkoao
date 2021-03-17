/******  Task 2.1.1  ******/

function arrayDiffFirst(first = [1,2,2,2,3,0], second = [2, 0, 4]) {
    return first.filter(function (item) {
        return !second.filter(val => val === item).length
    });
}

console.log(arrayDiffFirst())

/******  Task 2.1.2  ******/

function arrayDiffSecond(first = [1,2,2,2,3,0], second = [2, 0, 4]) {
    const result = [];

    first.forEach(function (item) {
        if (!second.includes(item)) {
            result.push(item);
        }
    })

    return result;
}

console.log(arrayDiffSecond())

/******  Task 2.1.3  ******/

function arrayDiffThird(first = [1,2,2,2,3,0], second = [2, 0, 4], result = []) {
    if (first.length) {
        if (!second.includes(first[0])) {
            result.push(first[0]);
        }

        first.shift();

        return arrayDiff(first, second, result);
    }

    return result;
}


/******  Task 2.2  ******/

let sampleText = ("En liten hummock en stor cart kan snu");

    function alphabetPosition(text) {
        return text 
            .replace(/(\W|\d|\_)/gm, "")
            .toLowerCase().split("").map((item) => {
                return item.charCodeAt(0) - 96
            })
            .join(" ");
    }
console.log(alphabetPosition(sampleText));


/******  Task 2.3.1  ******/

function squareArrFirst(list) {
    return (
        +list.toString().split('').map((item) => Math.pow(item, 2))
            .join('')
    )
}
console.log(squareArrFirst(9119));

/******  Task 2.3.2  ******/

function squareArrSecond(num = 9119) {
    let oposum2 = [];

    const str = num.toString();

    for (let i = 0; i < str.length; i++) {
        const newItem = str[i] * str[i];

        oposum2.push(newItem);
    }



    return +oposum2.join('');
}

console.log(squareArrSecond())

/******  Task 2.3.3  ******/

function squareArrThird(num = 9119, result = '') {
    if (num > 0) {
        const rest = num % 10;
        const newNum = parseInt(num / 10);
        return squareDigits(newNum, parseInt(`${Math.pow(rest, 2)}${result}`));
    }

    return result || num;
}