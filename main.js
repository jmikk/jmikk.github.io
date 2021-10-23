var UserAgent = "toolAuthor:tmakrine@gmail.com";
var requestTimes = new Array();
var requestsNum = 0;
var nation;
var nationInput;

// avoid opening the page in several tabs 
// REASON: if it is open in several tabs and requests are made from all of them, it will throw an error of "Too many requests"
localStorage.openpages = Date.now();
var onLocalStorageEvent = function(e){
  if(e.key == "openpages"){
    localStorage.page_available = Date.now();
  }
  if(e.key == "page_available"){
    alert("ONE PAGE IS ALREADY OPEN!");
    var body = document.getElementsByTagName("body");
    body[0].innerHTML = "";
    var warning = document.createElement("p");
    warning.innerHTML = "PLEASE CLOSE THIS TAB!<br>";
    warning.innerHTML += "<br>YOU CAN'T SNEAKILY GET DATA FOR MORE THAN ONE NATION LIKE THAT!<br>";
    warning.innerHTML += "<br>IF I LET YOU, IT'D GIVE YOU THE RATE LIMIT ERROR!"
    warning.style.color = "black";
    warning.style.textAlign = "center";
    warning.style.marginTop = "20%";
    warning.style.marginTop = "20%";
    warning.style.backgroundColor = "orange";
    warning.style.padding = "5px";
    warning.style.fontWeight = "bold";
    body[0].appendChild(warning);
  }
};
window.addEventListener('storage', onLocalStorageEvent, false);
////////////////////////////////////



$(document).ready(function(){
    // buttons
    
    validButton = document.getElementById("validate");
    
    nationInput = document.getElementById("nation");

    $("#nation").on("input", function(){
        nation = document.getElementById("nation").value
        document.getElementById("nationExists").innerHTML = "";
        validButton.disabled = false;
    });
});
alert("works")

// validate whether the nation exists or not
function validate() {

    validButton.disabled = true;
    alert("works");

    // validate:
    
    try {
        nation = nation.replace(/ /g, '_');
        if(nationExists()) {
            console.log("Validatation: OK");
            document.getElementById("nationExists").innerHTML = "Validated Successfully!"
        }
        else {
            console.log("Validation: FAILED");
            document.getElementById("nationExists").innerHTML = "Nation does NOT exist!"
        }
    }
    catch(err) {
        console.log("ERROR:", err);
        document.getElementById("nationExists").innerHTML = "Please enter a nation name!"
    }
}

function nationExists() {
    requestsNum++;
    var http = new XMLHttpRequest();
    http.open('GET', `https://www.nationstates.net/cgi-bin/api.cgi?nation=${nation}`, false);
    http.send();
    if (http.status == 200)
        return true;
    else
        return false;
}


function createTable() {

    var tableHeader = new Array();
        tableHeader.push('#', 'CARD', 'SEASON', 'ASK', 'BID', 'MV', 'JUNK PRICE');

    // Add the header row if it is not created. 
    if(cardsNumberOnMarket == 1 && cardData.length){
        var row = table.insertRow(-1);
        for (var i = 0; i < 7; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = tableHeader[i];
            row.appendChild(headerCell);
        }
    }
    // Add rows
    row = table.insertRow(-1);
    for (var i = 0; i < 7; i++) {
        var cell = row.insertCell(-1);
        cell.innerHTML = cardData[i];
        if(cardData[7] && i == 4) cell.style.color = 'red';
        else if(!cardData[7] && i == 4) cell.style.color = 'blue';
    }

    // Add the table to the table div
    var parent = document.getElementById("myTable");
    parent.appendChild(table);
    cardData = [];
}


function getNationCards() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {   
        if(xhttp.readyState == 4) { // some data received
            if(xhttp.status == 200) { // everything went OK
                readNationXML(this);
                console.log("OK")
            }
            else if(xhttp.status == 403) console.log(nation + ": Forbidden!");
            else if(xhttp.status == 404) console.log(nation + " does not exist");
            else if(xhttp.status == 429) console.log("Too many requests! Blocked for 15 min!");
            else console.log("Unknown Error! Contact tmakrine@gmail.com or Mackiland");
        }
        else if(xhttp.readyState == 2) { // request is sent
            requestsNum++;
            console.log("Request Sent! " + requestsNum);
        }
    }
    xhttp.open("GET", `https://www.nationstates.net/cgi-bin/api.cgi?userAgent=${UserAgent}&q=cards+deck;nationname=${nation}`);
    xhttp.send();
}