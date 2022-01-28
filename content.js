// Sound URLS
const above_mp3_url = "https://freesound.org/data/previews/91/91926_7037-lq.mp3";
const below_mp3_url =  "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3";
 
// Sound Objects
var snd_above = new Audio(above_mp3_url);    
var snd_below = new Audio(below_mp3_url);    

function button_click() {
//   console.log("here");
//   document.body.style.backgroundColor = "blue";
  snd_above.play();
}

///

const swapInput = document.getElementById("swap-currency-input");
const swapOutput = document.getElementById("swap-currency-output");

const parent = swapOutput.parentElement;

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


const mutationCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (
      mutation.type !== "attributes" ||
      mutation.attributeName !== "value"
    ) {
      return;
    }

    const newPrice = mutation.target.getAttribute("value");

    if (newPrice)
    {
        console.log("new:", newPrice);

        if(inputAbove.value && newPrice > inputAbove.value)
        {
            console.log("ABOVE");
            console.log("above:", inputAbove.value);
            snd_above.play();
            document.body.style.backgroundColor = "blue";
        }

        if(inputBelow.value && newPrice < inputBelow.value)
        {
            console.log("BELOW");
            console.log("below:", inputBelow.value);
            snd_below.play();
            document.body.style.backgroundColor = "red";
        }
    }    
  }
};

const observer = new MutationObserver(mutationCallback);

observer.observe(test, { attributes: true});