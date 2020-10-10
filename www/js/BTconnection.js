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

// const { bondedDevices } = require("../../platforms/browser/platform_www/plugins/cordova-plugin-ble-central/www/ble");

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  //startScan 
  document.getElementById('scan').addEventListener("click", scan);

  /*
  * method needed for this screen
  */
  //Create menu dynamically
  createMenu();

  isBtTurnedOn();

  // test if BT is connected
  isBtConnected();

  //local storage
  var localStorage = window.localStorage; 

}

function isBtTurnedOn(){
  bluetoothSerial.enable(
    function() {
        console.log("[BTconnection]", "Bluetooth is enabled");

    },
    function() {
        dialogAlert("Please turn on Bluetooth");
        console.log("[BTconnection]", "The user did *not* enable Bluetooth");
    }
);
}

//Functions
function scan() {
  console.log("[BTconnection]", "start scan");
  showLoader();

  var list = document.getElementById("myList");   // Get the <ul> element with id="myList"
  list.innerHTML = '<li class="list-group-item list-group-item-dark text-center border border-dark font-weight-bold text-white ">Devices</li>';
  
  bluetoothSerial.discoverUnpaired(scanSuccess, scanfailure);
}

function scanSuccess(device) {
  if (device.length != 0) {

    console.log("[BTconnection]", "got a device");
    console.log(JSON.stringify(device));
    hideLoader();

    for (var key in device) {
      var thisDevice = device[key];
      var node = document.createElement("LI");
      var textnode = document.createTextNode(thisDevice.name + "\n" + thisDevice.address);
      node.appendChild(textnode);
      node.setAttribute("class", "list-group-item border border-dark font-weight-bold");
      node.setAttribute("name", thisDevice.name);
      node.setAttribute("deviceAddress", thisDevice.address);
      node.setAttribute("deviceId", thisDevice.id);
      node.setAttribute("deviceClass", thisDevice.class);

      var deviceListId = thisDevice.name + "_" + key;
      node.setAttribute("id", deviceListId);

      node.addEventListener("click", deviceClick);

      document.getElementById("myList").appendChild(node);

    }

  } else {
    hideLoader();
    dialogAlert("No devices found.");
  }
}

function scanfailure(e) {
  hideLoader();
  alert("error:", e);
  console.log("[BTconnection]", "error: " + e);
}


function deviceClick() {
  var device = document.getElementById(this.id);
  console.log("******************************");
  console.log("id", device.id);
  console.log("name", device.getAttribute("name"));
  console.log("deviceAddress", device.getAttribute("deviceAddress"));
  console.log("deviceId", device.getAttribute("deviceId"));
  console.log("deviceClass", device.getAttribute("deviceClass"));
  console.log("******************************");

  localStorage.setItem("btDeviceName", device.getAttribute("name"));
  localStorage.setItem("btDeviceMacAddress", device.getAttribute("deviceAddress"));
  
  connectToDevice(device.getAttribute("deviceAddress"));
}

function connectToDevice(btMacAddress) {
  // bluetoothSerial.connect(btMacAddress, connectSuccess, connectFailure);
  bluetoothSerial.connectInsecure(btMacAddress, connectSuccess, connectFailure);
}

function connectSuccess() {
  console.log("[BTconnection]", "Connected succesfull");
  var device = null;
  if(localStorage.getItem("btDeviceName") != null){
    device = localStorage.getItem("btDeviceName");
  } else {
    device = localStorage.getItem("btDeviceMacAddress");
  }
  dialogConnectSuccess("Connected to device successful.\n" + device);
  isBtConnected();
}

function connectFailure() {
  localStorage.removeItem("btDeviceName");
  localStorage.removeItem("btDeviceMacAddress");
  hideLoader();
  dialogAlert("Failed to connect...");
  console.error("[BTconnection]", "Connected Failed");
}

function dialogAlert(displayMessage) {
  var message = displayMessage;
  var title = "ALERT";
  var buttonName = "Close";
  navigator.notification.alert(message, alertCallback, title, buttonName);
  
  function alertCallback() {
     console.log("Alert is Dismissed!");
  }
}

function dialogConnectSuccess(displayMessage) {
  var message = displayMessage;
  var title = "Success";
  var buttonName = "Close";
  navigator.notification.alert(message, alertCallback, title, buttonName);
  
  function alertCallback() {
     console.log("Alert is Dismissed!");
  }
}
