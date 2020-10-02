/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    document.getElementById('rangeRed').addEventListener("change", changeRed);
    document.getElementById('rangeGreen').addEventListener("change", changeGreen);
    document.getElementById('rangeBlue').addEventListener("change", changeBlue);

    document.getElementById('send').addEventListener("click", sendColor);

    /*
    * method needed for this screen
    */
    //Create menu dynamically
    createMenu();

    // test if BT is connected
    isBtConnected();

    /* VARS*/
    var localStorage = window.localStorage;
    setupVars();

}

//local vars to use
var RED = 0;
var GREEN = 0;
var BLUE = 0;

function setupVars() {
    if (localStorage !== null) {
        if (localStorage.getItem("RED") !== null) {
            RED = localStorage.getItem("RED");
            document.getElementById("redValue").innerText = RED;
            document.getElementById("rangeRed").value = RED;
        }
        if (localStorage.getItem("GREEN") !== null) {
            GREEN = localStorage.getItem("GREEN");
            document.getElementById("greenValue").innerText = GREEN;
            document.getElementById("rangeGreen").value = GREEN;
        }
        if (localStorage.getItem("BLUE") !== null) {
            BLUE = localStorage.getItem("BLUE");
            document.getElementById("blueValue").innerText = BLUE;
            document.getElementById("rangeBlue").value = BLUE;
        }
        setCicleColor(RED, GREEN, BLUE);
    }
}

function changeRed() {
    var valueOfRed = document.getElementById("rangeRed").value;
    document.getElementById("redValue").innerText = valueOfRed;
    setCicleColor(valueOfRed, GREEN, BLUE);
    updateRed(valueOfRed);
}

function changeGreen() {
    var valueOfGreen = document.getElementById("rangeGreen").value;
    document.getElementById("greenValue").innerText = valueOfGreen;
    setCicleColor(RED, valueOfGreen, BLUE);
    updateGreen(valueOfGreen);
}

function changeBlue() {
    var valueOfBlue = document.getElementById("rangeBlue").value;
    document.getElementById("blueValue").innerText = valueOfBlue;
    setCicleColor(RED, GREEN, valueOfBlue);
    updateBlue(valueOfBlue);
}

function setCicleColor(red, green, blue) {
    document.getElementById("currentColor").style.backgroundColor = `rgb(${red},${green},${blue})`;
}

function sendColor() {
    sendColorToBT();
}

