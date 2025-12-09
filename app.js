let input = document.querySelector(".display");
let keys = document.querySelector(".keys");
let C = document.querySelector(".op");

const btnLabel = ["/", "*", "-", 7, 8, 9, "+", 4, 5, 6, "=", 0, 1, 2, 3];

input.readOnly = true;
let inputText = "";

btnLabel.forEach(function (btn) {
    let btnElem = document.createElement("button");
    btnElem.innerHTML = btn;

    if (btn === "=") {
        btnElem.addEventListener("click", function () {
            try {
                let numbers = inputText.split(/[\+\-\*\/]/).map(Number);
                let operators = inputText.split(/[0-9]+/).filter(op => op !== "");

                for (let i = 0; i < operators.length; i++) {
                    if (operators[i] === "*" || operators[i] === "/") {
                        numbers[i] = operators[i] === "*"
                            ? numbers[i] * numbers[i + 1]
                            : numbers[i] / numbers[i + 1];
                        numbers.splice(i + 1, 1);
                        operators.splice(i, 1);
                        i--;
                    }
                }

                let result = numbers[0];
                for (let i = 0; i < operators.length; i++) {
                    if (operators[i] === "+") result += numbers[i + 1];
                    else if (operators[i] === "-") result -= numbers[i + 1];
                }
                if (isNaN(result)) {
                    result = "Error";
                }
                input.value = result;
                inputText = result.toString();

            } catch (e) {
                input.value = "Error";
                inputText = "";
            }
        });
    } else {
        btnElem.addEventListener("click", function (event) {
            let value = event.target.innerHTML;
            inputText += value;
            input.value = inputText;
        });
    }

    keys.append(btnElem);
});

C.addEventListener("click", function () {
    input.value = "";
    inputText = "";
});
