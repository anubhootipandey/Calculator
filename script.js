"use strict";

var input = document.getElementById('input'), 
  num = document.querySelectorAll('.nums div'), 
  operator = document.querySelectorAll('.operators div'), 
  result = document.getElementById('result'), 
  clear = document.getElementById('clear'), 
  resultDisplayed = false; 

for (var i = 0; i < num.length; i++) {
  num[i].addEventListener("click", function(e) {

    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      console.log("enter a number first");
    } else {
      input.innerHTML += e.target.innerHTML;
    }

  });
}

result.addEventListener("click", function() {
  var inputString = input.innerHTML;
  var nums = inputString.split(/\+|\-|\×|\÷/g);
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(nums);
  console.log("----------------------------");

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    nums.splice(subtract, 2, nums[subtract] - nums[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    nums.splice(add, 2, parseFloat(nums[add]) + parseFloat(nums[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    nums.splice(divide, 2, nums[divide] / nums[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    nums.splice(multiply, 2, nums[multiply] * nums[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  input.innerHTML = nums[0]; 
  resultDisplayed = true; 
});

clear.addEventListener("click", function() {
  input.innerHTML = "";
})