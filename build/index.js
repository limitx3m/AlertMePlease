"use strict";
/**
 * Sound
 */
// Sound URLS
var above_mp3_url = "https://freesound.org/data/previews/135/135613_2477074-lq.mp3";
var below_mp3_url = "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3";
// Sound Objects
var snd_above = new Audio(above_mp3_url);
var snd_below = new Audio(below_mp3_url);
/**
 * Dom Elements
 */
// Swap Output Element
var swapOutput = document.getElementById("swap-currency-output");
// Swap Output's Input
var swapOutputInputBox = swapOutput.getElementsByTagName("input")[0];
// Input for above price
var inputAbove = document.createElement("input");
inputAbove.type = "number";
inputAbove.placeholder = "Insert Above Price";
// Input for below price
var inputBelow = document.createElement("input");
inputBelow.type = "number";
inputBelow.placeholder = "Insert Below Price";
// Input Toggle Button for alerts
var alertButton = document.createElement("input");
alertButton.type = "button";
alertButton.value = "Set";
alertButton.id = "alertbutton";
alertButton.addEventListener("click", alert_click);
// Mutation Observer
var observer = new MutationObserver(on_mutation);
/**
 * Interval setup
 */
var nIntervId;
var direction = 0;
/**
 * Functions
 */
function alert_click() {
    if (alertButton.value == "Set") {
        observer.observe(swapOutputInputBox, { attributes: true });
        document.body.style.backgroundColor = "green";
        inputAbove.disabled = true;
        inputBelow.disabled = true;
        alertButton.value = "Stop";
    }
    else {
        if (nIntervId) {
            clearInterval(nIntervId);
            nIntervId = null;
        }
        observer.disconnect();
        document.body.style.backgroundColor = "";
        inputAbove.disabled = false;
        inputBelow.disabled = false;
        alertButton.value = "Set";
    }
}
;
function add_elements(element) {
    var parent = element.parentElement;
    parent.appendChild(inputAbove);
    parent.appendChild(alertButton);
}
;
function play_sound() {
    if (direction == 1) {
        snd_above.play();
    }
    if (direction == -1) {
        snd_below.play();
    }
}
function on_new_price(price) {
    var priceNumber = parseFloat(price);
    var alertValue = parseFloat(inputAbove.value);
    if ((alertValue) && (priceNumber > alertValue)) {
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
}
function on_mutation(mutationsList) {
    for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
        var mutation = mutationsList_1[_i];
        if (mutation.type !== "attributes" ||
            mutation.attributeName !== "value") {
            return;
        }
        var newPrice = mutation.target.getAttribute("value");
        if (newPrice)
            on_new_price(newPrice);
    }
}
;
/**
 * Executables
 */
add_elements(swapOutput);
