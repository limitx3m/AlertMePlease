console.log("TEST")

document.body.style.backgroundColor = "blue";

// let observer = new MutationObserver((mutationRecords) => {
//  console.log(mutationRecords)
// });

const swapInput = document.getElementById("swap-currency-input");
const swapOutput = document.getElementById("swap-currency-output");

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