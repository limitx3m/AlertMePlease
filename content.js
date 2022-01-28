/**
 * Sound 
 */

// Sound URLS
const above_mp3_url =
  "https://freesound.org/data/previews/135/135613_2477074-lq.mp3";
const below_mp3_url =  "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3";
 
// Sound Objects
const snd_above = new Audio(above_mp3_url);    
const snd_below = new Audio(below_mp3_url);    

/**
 * Dom Elements 
 */ 

// Swap Output Element
const swapOutput = document.getElementById("swap-currency-output");

// Swap Output's Input
const swapOutputInputBox = swapOutput.getElementsByTagName("input")[0];

// Input for above price
const inputAbove = document.createElement("input");
inputAbove.type = "number";
inputAbove.placeholder = "Insert Above Price";

// Input for below price
const inputBelow = document.createElement("input");
inputBelow.type = "number";
inputBelow.placeholder = "Insert Below Price";

// Input Toggle Button for alerts
const alertButton = document.createElement("input");
alertButton.type = "button";
alertButton.value = "Set";
alertButton.id = "alertbutton";
alertButton.addEventListener("click", alert_click);


// Mutation Observer
const observer = new MutationObserver(on_mutation);

/**
 * Interval setup
 */

let nIntervId;
let direction = 0;

/**
 * Functions
 */
function alert_click() {
    if(alertButton.value == "Set") {
        observer.observe(swapOutputInputBox, { attributes: true });
        document.body.style.backgroundColor = "green";
        inputAbove.disabled = true;
        inputBelow.disabled = true;
        alertButton.value = "Stop"
    } else {
        if (nIntervId) {
            clearInterval(nIntervId);
            nIntervId = null;
        }
        observer.disconnect();
        document.body.style.backgroundColor = "";
        inputAbove.disabled = false;
        inputBelow.disabled = false;
        alertButton.value = "Set"
    }
};

function add_elements(element) {
    const parent = element.parentElement;
    parent.appendChild(inputAbove);
    parent.appendChild(inputBelow);
    parent.appendChild(alertButton);
};

function play_sound() {
    if(direction == 1) {
      snd_above.play();
    }

    if (direction == -1) {
      snd_below.play();
    }
}

function on_new_price(price) {
    // console.log("new:", price);

    if (inputAbove.value && price > inputAbove.value) {
        // console.log("above:", inputAbove.value);
        if (!nIntervId) {
            direction = 1;
            nIntervId = setInterval(play_sound, 1000);
        }
        else if (nIntervId && direction == -1) {
            clearInterval(nIntervId);
            nIntervId = null;
            direction = 1;
            nIntervId = setInterval(play_sound, 1000);
        }
        // snd_above.play();
        document.body.style.backgroundColor = "blue";
    }

    if (inputBelow.value && price < inputBelow.value) {
        // console.log("below:", inputBelow.value);
        if (!nIntervId) {
            direction = -1;
            nIntervId = setInterval(play_sound, 1000);
        }
        else if (nIntervId && direction == 1) {
            clearInterval(nIntervId);
            nIntervId = null;
            direction = -1;
            nIntervId = setInterval(play_sound, 1000);
        }
        // snd_below.play();
        document.body.style.backgroundColor = "red";
    } 
}

function on_mutation(mutationsList) {
    for (const mutation of mutationsList) {
        if (
            mutation.type !== "attributes" ||
            mutation.attributeName !== "value"
        ) {
            return;
        }

        const newPrice = mutation.target.getAttribute("value");
        if (newPrice) on_new_price(newPrice);
    }
};

/**
 * Executables
 */
add_elements(swapOutput);



