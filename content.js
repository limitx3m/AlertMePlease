console.log("TEST")

// document.body.style.backgroundColor = "blue";

// let button = document.createElement('input');
// button.type = "number";
// button.value = "Change background to red";

// let child = document.body.firstChild;
// let swappage = document.getElementById("swap-page");
// let parent = swappage.parentElement;
// let next = swappage.nextSibling;
// let newbutton = document.createElement("button");
// let text = document.createTextNode("test");

// button.appendChild(text);

// if(next) parent.insertBefore(newbutton, next)
// else parent.appendChild(button);


// document.body.insertBefore(button, child);

// button.addEventListener("click", button_click);




function button_click() {
  console.log("here");
  document.body.style.backgroundColor = "blue";
}

///

const swapInput = document.getElementById("swap-currency-input");
const swapOutput = document.getElementById("swap-currency-output");
const swapButton = document.getElementById("swap-button");

const parent = swapButton.parentElement;
const next = swapButton.nextSibling;


let inputAbove = document.createElement("input");
inputAbove.type = "number";
inputAbove.id = "above";
inputAbove.placeholder = "Insert Above Price";


let inputBelow = document.createElement("input");
inputBelow.type = "number";
inputBelow.id = "below";
inputBelow.placeholder = "Insert Below Price";



parent.appendChild(inputAbove);
parent.appendChild(inputBelow);


const test = swapOutput.getElementsByTagName("input")[0];

// test.onchange = () => console.log("change");
// test.addEventListener('change', () => console.log(`change: ${test.value}`), false);
// observer.observe(test, { childList: true, subtree: true})
// observe everything except attributes
// observer.observe(elemId, {
// childList: true, // observe direct children
// subtree: true, // lower descendants too
// characterDataOldValue: true, // pass old data to callback
// });
const mutationCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (
      mutation.type !== "attributes" ||
      mutation.attributeName !== "value"
    ) {
      return;
    }
    console.log("old:", mutation.oldValue);
    console.log("new:", mutation.target.getAttribute("value"));
  }
};

const observer = new MutationObserver(mutationCallback);

observer.observe(test, { attributes: true});

setTimeout(() => console.log(test), 3000)