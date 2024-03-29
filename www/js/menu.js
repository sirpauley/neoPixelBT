
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!


}
var currentPage = null;
var menuItems = {
                "Main menu" : "index.html", 
                // "Services": "#", 
                // "Clients" : "#", 
                "Connect to BT": "BTconnection.html",
                "Color wheel":"colorWheel.html",
                // "Send Colors" : "sendColor.html",
                "Mode" : "colorMode.html"
              };
//Functions

{/* 
  


*/}

//localVars
var colorPickerT;

// function createMenu(callback){
  function createMenu(){
  
  if(currentPage === null){
    currentPage = Object.keys(menuItems)[0];;
  }

  var menu = document.getElementById("headerMenu");
  var nav = document.createElement("nav");
  nav.setAttribute("class","navbar navbar-dark bg-dark border border-dark border-top-0 border-left-0 border-right-0");

  var menuItemsSection = document.createElement("div")
  menuItemsSection.setAttribute("id","mySidenav");
  menuItemsSection.setAttribute("class","sidenav border border-dark border-top-0 border-left-0 border-bottom-0");
  
  var closeButton = document.createElement("a");
  closeButton.setAttribute("class", "closebtn navbar-text text-primary");
  closeButton.setAttribute("id", "closeNav");
  closeButton.addEventListener("click", closeNav);
  closeButton.innerHTML = "&times;";

  menuItemsSection.appendChild(closeButton);

  for (var key in menuItems) {
    var element = key;
    var elementId = convertMenuNameToID(element);//"goTo" + element.replace(" ","").replace("-","").replace(".", "");
    var newMenuItem = document.createElement("a");
    newMenuItem.setAttribute("class", "text-secondary");
    newMenuItem.setAttribute("id",elementId);
    newMenuItem.setAttribute("value",elementId);
    newMenuItem.setAttribute("href",menuItems[key]);
    newMenuItem.innerHTML = element;
    menuItemsSection.appendChild(newMenuItem);
    // console.log(element,"elementId:", elementId); //for testin
  }

  var navBarText = document.createElement("span");
  navBarText.setAttribute("class", "navbar-text text-primary");
  var openMenuButton = document.createElement("span");
  openMenuButton.setAttribute("class","text-primary");
  openMenuButton.setAttribute("id","openNav");
  openMenuButton.innerHTML = "&#9776; ";
  openMenuButton.style.fontSize = "30px";
  openMenuButton.cursor = "pointer";
  openMenuButton.addEventListener("click", openNav);
  
  var menuBarTitle = document.createElement("span");
  menuBarTitle.setAttribute("class","text-secondary");

  if(menuItems[key] == window.location.pathname.split("/").pop())
    currentPage = key;
  
  menuBarTitle.innerHTML = currentPage;
  menuBarTitle.style.fontSize = "30px";
  // console.log(navBarText); //for testing

  navBarText.appendChild(openMenuButton);
  navBarText.appendChild(menuBarTitle);

  nav.appendChild(menuItemsSection);
  nav.appendChild(navBarText);
  menu.appendChild(nav);
  // callback();

  document.getElementById("mySidenav").style.left = "-255px";

}

function convertMenuNameToID(element){
  return "goTo" + element.replace(" ","").replace("-","").replace(".", "");
}

function openNav() {
    console.log("[menu]","openNav");
    // document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.left = "0px";
  }
  
  function closeNav() {
    console.log("[menu]", "closeNav");
    // document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.left = "-255px";
  }

  // loader
  function showLoader(){
    document.getElementById("loader").style.visibility = "visible";
  }

  function hideLoader(){
    document.getElementById("loader").style.visibility = "hidden";
  }

  var colorPickerT;
  function startColorWheel(colorHex){
    colorHex = '#' + colorHex;
    colorPickerT = new KellyColorPicker({
        place : 'picker', 
        input : 'color',
        size : 330,
        color : colorHex,
        userEvents:{
          // change :wheelColorChanged,
          // mousemovesv : wheelColorChanged,
          mouseuph : wheelColorChanged,
          // selectcolorsaver : wheelColorChanged,
          updateInput : wheelColorChanged,
          mouseupsv : wheelColorChanged,
          mousemoveh : wheelColorChanged,
        }
    });
  }

  