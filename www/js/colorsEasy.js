document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    //local vars to use
    var RED = 0;
    var GREEN = 0;
    var BLUE = 0;
    var rgbStringToSend = '[{"red":0,"green":0,"blue":0,}]';
    var colorHex = "000000"; //without the #

    // local storage
    var localStorage = window.localStorage; 

}

function setupVars(){
    if(localStorage !== null){
        if(localStorage.getItem("RED") !== null){
            RED = localStorage.getItem("RED");
        }
        if(localStorage.getItem("GREEN") !== null){
            GREEN = localStorage.getItem("GREEN");
        }
        if(localStorage.getItem("BLUE") !== null){
            BLUE = localStorage.getItem("BLUE");
        }
        if(localStorage.getItem("rgbStringToSend") !== null){
            rgbStringToSend = localStorage.getItem("rgbStringToSend");
        }
        if(localStorage.getItem("colorHex") !== null){
            colorHex = localStorage.getItem("colorHex");
        }
    }
}

function updateRed(redValue){
    updateRGB(redValue, GREEN, BLUE);
}

function updateGreen(greenValue){
    updateRGB(RED, greenValue, BLUE);
}

function updateBlue(blueValue){
    updateRGB(RED, GREEN, blueValue);
}

function updateRGB(red=0, green=0, blue=0){
    
    if(red !== RED)
        printChangedColor("RED", red);

    if(green !== GREEN)
        printChangedColor("GREEN", green);

    if(blue !== BLUE)
        printChangedColor("BLUE", blue);

    RED = red;
    GREEN = green;
    BLUE = blue;
    rgbStringToSend = myOwnTypeOfStringify(RED, GREEN, BLUE);
    colorHex = fullColorHex(RED, GREEN, BLUE);

    localStorage.setItem("RED", RED);
    localStorage.setItem("GREEN", GREEN);
    localStorage.setItem("BLUE", BLUE);
    localStorage.setItem("rgbStringToSend", rgbStringToSend);
    localStorage.setItem("colorHex", colorHex);

}

// setLocalStorage = function(){
    
// }

//this function creates string for sending to BT devices
//format currently is as follows
//['{"red":RED,"green":GREEN,"blue":BLUE,}]'
function myOwnTypeOfStringify(red, green, blue){
    colorsString = `[{"red":${red},"green":${green},"blue":${blue},}]`;
    // console.log("[colorEasy]", colorsString);
    return colorsString; //in string format
}

function printChangedColor(color, value){
    console.log("[colorEasy]",`${color} changed to ${value}`);
}

//convert hex color to RGB values - tested
var hexToRgb = function(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

var rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
            hex = "0" + hex;
    }
    return hex;
};

var fullColorHex = function(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red+green+blue;
};