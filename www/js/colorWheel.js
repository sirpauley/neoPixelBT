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

    /*
    * method needed for this screen
    */
    //Create menu dynamically
    createMenu();

    // test if BT is connected
    isBtConnected();

    //start the color wheel
    // startColorWheel(colorHex);

    /* VARS*/
    var localStorage = window.localStorage;
    if (localStorage !== null && localStorage.getItem("colorHex") !== null) {
        startColorWheel(localStorage.getItem("colorHex"));
    } else {
        //seting default color if none exists
        var initR = 255; 
        var initB = 0;
        var initG = 255;
        var initHex = "ff00ff";
        var initMode = "solid";
        localStorage.setItem("RED", initR);
        localStorage.setItem("GREEN", initB);
        localStorage.setItem("BLUE", initG);
        localStorage.setItem("rgbStringToSend", myOwnTypeOfStringify(initR, initB, initG, initMode));
        localStorage.setItem("colorHex", initHex);
        localStorage.setItem("colorMode", initMode); 

        startColorWheel(localStorage.getItem("colorHex"));
    }
    setupVars();

    //update colors
    document.getElementById('send').addEventListener("click", sendColor);
    document.getElementById('inputColor').style.display = "flex";
}

//local vars to use
var colorHex = "";

function setupVars() {
    if (localStorage !== null && localStorage.getItem("colorHex") !== null) {
        colorHex = localStorage.getItem("colorHex");
    }

}

function wheelColorChanged() {
    var colorRGB = document.getElementById("color").style.backgroundColor;

    rgbArr = colorRGB.substring(4, colorRGB.length - 1).replace(/ /g, '').split(',');

    red = rgbArr[0];
    green = rgbArr[1];
    blue = rgbArr[2];
    colorMode = getColorMode();
    // console.log("[colorWheel]", "colorRGB", colorRGB);
    // console.log("[colorWheel]", "colorRGB2", rgbArr);
    // console.log("[colorWheel]", "colorR", red);
    // console.log("[colorWheel]", "colorG", green);
    // console.log("[colorWheel]", "colorB", blue);
    // document.getElementById("color").style.color = `rgb(${red}, ${green}, ${blue})`;
    // document.getElementById("color").style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    updateRGB(red, green, blue, colorMode);

}

function sendColor() {
    sendColorToBT();
}