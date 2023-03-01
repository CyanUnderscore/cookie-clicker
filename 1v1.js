function GoToCoukieClicker() {
    window.location.href='index.html';
}

document.body.onkeyup = function(e) {
    if (e.key == "5") {
        clickTheCOUKIE(2);
    } else if (e.key == "s") {
        clickTheCOUKIE(1);
    }
  }

let NC = 0;
let Display = 0;

let clickAtSec1 = 0;
let clickAtSec2 = 0;

let bestCPS1 = 0;
let bestCPS2 = 0;


localStorage.setItem("backgound", localStorage.getItem("background") || "white"); // theme actuel
localStorage.setItem("NC1", localStorage.getItem("NC1") || 0); // nombre de cookie en stock
localStorage.setItem("NC2", localStorage.getItem("NC2") || 0);

// update le théme 
background = localStorage.getItem("background");
if(background === "white"){
    document.body.style.background = "black";
    for(i=0;i<document.getElementsByTagName("strong").length; i++) {
        document.getElementsByTagName("strong")[i].style.color = "white";
    }
    document.getElementsByTagName("h1")[0].style.color = "white";
    localStorage.setItem("background", "black");
} else {
    document.body.style.background = "white";
    for(i=0;i<document.getElementsByTagName("strong").length; i++) {
        document.getElementsByTagName("strong")[i].style.color = "black";
    }
    document.getElementsByTagName("h1")[0].style.color = "black";
    localStorage.setItem("background", "white");
}


function switchtheme() {
    background = localStorage.getItem("background");
    if(background === "white"){
        document.body.style.background = "black";
        for(i=0;i<document.getElementsByTagName("strong").length; i++) {
            document.getElementsByTagName("strong")[i].style.color = "white";
        }
        document.getElementsByTagName("h1")[0].style.color = "white";
        localStorage.setItem("background", "black");
    } else {
        document.body.style.background = "white";
        for(i=0;i<document.getElementsByTagName("strong").length; i++) {
            document.getElementsByTagName("strong")[i].style.color = "black";
        }
        document.getElementsByTagName("h1")[0].style.color = "black";
        localStorage.setItem("background", "white");
    }
}

function clickTheCOUKIE(a) {
    if(a === 1){
        localStorage.setItem("NC1", parseInt(localStorage.getItem("NC1"))+1);
        document.getElementById("NbrCoukies1").textContent = localStorage.getItem("NC1") + "coukies";
        document.getElementById("bigCoukie1").style.height = 400+"px";
        document.getElementById("bigCoukie1").style.width = 440+"px";
        clickAtSec1 ++;
        setTimeout(resizeCoukie(1), 100);
    } else {
        localStorage.setItem("NC2", parseInt(localStorage.getItem("NC2"))+1);
        document.getElementById("NbrCoukies2").textContent = localStorage.getItem("NC2") + "coukies";
        document.getElementById("bigCoukie2").style.height = 400+"px";
        document.getElementById("bigCoukie2").style.width = 440+"px";
        clickAtSec2 ++;
        setTimeout(resizeCoukie(2), 100);
    }
}

function resizeCoukie(i) {
    if(i === 1) {
        document.getElementById("bigCoukie1").style.height = 500+"px";
    document.getElementById("bigCoukie1").style.width = 550+"px";
    } else {
        document.getElementById("bigCoukie2").style.height = 500+"px";
    document.getElementById("bigCoukie2").style.width = 550+"px";
    }
}

function speed() {
    document.getElementById("CPS1").textContent = clickAtSec1 + "  click/s";
    document.getElementById("CPS2").textContent = clickAtSec2 + "  click/s";

    localStorage.setItem('clickAtSec1', clickAtSec1);
    localStorage.setItem('clickAtSec2', clickAtSec2);

    if (bestCPS1 <= clickAtSec1){
        bestCPS1 = clickAtSec1;
        document.getElementById("BestCPS1").textContent = bestCPS1 + "  click/s";
    }
    
    if (bestCPS2 <= clickAtSec2){

        bestCPS2 = clickAtSec2;
        document.getElementById("BestCPS2").textContent = bestCPS2 + "  click/s";
    }

    
    clickAtSec1 = 0;
    clickAtSec2 = 0;
}