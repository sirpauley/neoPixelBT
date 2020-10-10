// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    //Create menu dynamically
    createMenu();

    // test if BT is connected
    isBtConnected();

    //setup vars for thee colors
    setupVars();

    //selectMode
    document.getElementById('selectMode').addEventListener("click", openSelectionWheel);
    
    //load currect label
    loadLabel();
}

// Prepare the picker configuration
var config = {
    title: "Select a Color mode", 
    items: [
        { text: "RGB Loop"              , value: "RGBLoop" },
        { text: "Fade In and Out"       , value: "FadeInOut" },
        { text: "Strobe"                , value: "Strobe" },
        { text: "Cylon Bounce"          , value: "CylonBounce" },
        { text: "KITT"                  , value: "NewKITT" },
        { text: "Twinkle"               , value: "Twinkle" },
        { text: "Twinkle Random Colors" , value: "TwinkleRandom" },
        { text: "Running Lights"        , value: "RunningLights" },
        { text: "Solid"                 , value: "solid" }
    ],
    selectedValue: "solid", //Default selected
    doneButtonLabel: "Done",
    cancelButtonLabel: "Cancel"
};

function openSelectionWheel(){

config.selectedValue = getColorMode();
// console.log("[colorMode]", "selectedValue",  config.selectedValue);

// Show the picker
window.plugins.listpicker.showPicker(config, 
    function(item) { 
        // alert("You have selected " + item);// for testing
        updateColorModeSelected(item);
    },
    function() { 
        console.log("[colorMode]", "You have cancelled the selection");
    }
);

}

function updateColorModeSelected(colorMode){
    updateColorMode(colorMode);
    updateLabel(colorMode);
    sendColorToBT();
}

function getKeyByValue(configItems, searchValue) {
    for (var i = 0; i < configItems.length; i++) { 
        if (configItems[i].value === searchValue) { 
            return configItems[i].text; 
        } 
    }
}

function updateLabel(colorMode){
    colorModeText = getKeyByValue(config.items,colorMode)
    // console.log("[colorMode]", "colorModeText:", colorModeText);
    document.getElementById("currentModeSelected").innerHTML = colorModeText;
    config.items.selectedValue = colorMode;
}

function loadLabel(){
    config.selectedValue = getColorMode();
    // console.log("[colorMode]", "selectedValue",  config.selectedValue);

    colorModeText = getKeyByValue(config.items,config.selectedValue)
    document.getElementById("currentModeSelected").innerHTML = colorModeText;
}