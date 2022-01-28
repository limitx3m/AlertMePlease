console.log("TEST")
var mp3_url =
  "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3";
var snd = new Audio(mp3_url);    

function button_click() {
//   console.log("here");
//   document.body.style.backgroundColor = "blue";
  snd.play();
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


let alertButton = document.createElement("input");
alertButton.type = "button";
alertButton.value = "Set";

alertButton.addEventListener("click", button_click);

parent.appendChild(inputAbove);
parent.appendChild(inputBelow);
parent.appendChild(alertButton);


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
    console.log("above:", inputAbove.value)
    console.log("below:", inputBelow.value)
  }
};

const observer = new MutationObserver(mutationCallback);

observer.observe(test, { attributes: true});

setTimeout(() => console.log(test), 3000)