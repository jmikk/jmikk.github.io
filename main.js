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
    startButton = document.getElementById("getData");
    contButton = document.getElementById("cont");
    pauseButton = document.getElementById("pause");
    validButton = document.getElementById("validate");
    
    nationInput = document.getElementById("nation");

    $("#nation").on("input", function(){
        nation = document.getElementById("nation").value
        document.getElementById("nationExists").innerHTML = "";
        validButton.disabled = false;
    });
});


function validate() {
}