/**
 * Sound 
 */

// Sound URLS
const above_mp3_url = "https://freesound.org/data/previews/91/91926_7037-lq.mp3";
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
const observer = new MutationObserver(mutationCallback);


/**
 * Functions
 */
function alert_click() {
    if(alertButton.value == "Set") {
        observer.observe(swapOutputInputBox, { attributes: true });
        alertButton.value = "Stop"
    } else {
        observer.disconnect();
        document.body.style.backgroundColor = "";
        alertButton.value = "Set"
    }
};

function add_elements(element) {
    const parent = element.parentElement;
    parent.appendChild(inputAbove);
    parent.appendChild(inputBelow);
    parent.appendChild(alertButton);
};

function mutationCallback(mutationsList) {
    for (const mutation of mutationsList) {
        if (
            mutation.type !== "attributes" ||
            mutation.attributeName !== "value"
        ) {
            return;
        }

        const newPrice = mutation.target.getAttribute("value");

        if (newPrice) {
            console.log("new:", newPrice);

            if (inputAbove.value && newPrice > inputAbove.value) {
            console.log("ABOVE");
            console.log("above:", inputAbove.value);
            snd_above.play();
            document.body.style.backgroundColor = "blue";
            }

            if (inputBelow.value && newPrice < inputBelow.value) {
            console.log("BELOW");
            console.log("below:", inputBelow.value);
            snd_below.play();
            document.body.style.backgroundColor = "red";
            }
        }
    }
};

/**
 * Execute
 */
add_elements(swapOutput);



