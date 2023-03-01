// variables utiliser pour le calcul de productiviter cookies/s
let clickAtSec = 0;
let coukiesAtSec = 0;
let bestCPS = 0;
let bestCoPS = 0;

// stokage sound effect
const myMusic= document.getElementById("music");

// necessair pur le reset (prix originaux des couhies chiefs)
let origin_price = [100, 10000, 1000000, 1000000000, 1000000000000];

// aquisition des variables stocké dans le cache du navigateur (si elle ne sont pas trouver on leur assigne une valeur prés défini) 
localStorage.setItem("NC", localStorage.getItem("NC") || 0); // nombre de cookie en stock
localStorage.setItem("CDC", localStorage.getItem("CDC") || 1.0); //coef multiplicateur du prix du copper coukies chief
localStorage.setItem("CDS", localStorage.getItem("CDS") || 1.0); //coef multiplicateur du prix du silver coukies chief
localStorage.setItem("CDG", localStorage.getItem("CDG") || 1.0); //coef multiplicateur du prix du gold coukies chief
localStorage.setItem("CDP", localStorage.getItem("CDP") || 1.0); //coef multiplicateur du prix du platinium coukies chief
localStorage.setItem("CDCo", localStorage.getItem("CDco") || 1.0); //coef multiplicateur du prix du COUKIES coukies chief
localStorage.setItem("UpCost", localStorage.getItem("UpCost") || 100); // prix de l'amelioration multiplicatuer de click
localStorage.setItem("Clicking Power", localStorage.getItem("Clicking Power") || 1); // force de l'amelioration multiplicatuer de click
localStorage.setItem("backgound", localStorage.getItem("background") || "white"); // theme actuel

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



// appeler quand on appuis sur le cookie (ou bouton si j'ai oublier / pas eu le temp de l'ajouter)
function clickTheCOUKIE() {
    localStorage.setItem("NC", parseInt(localStorage.getItem("NC")) + parseInt(localStorage.getItem("Clicking Power")));
    document.getElementById("NbrCoukies").textContent = localStorage.getItem("NC");
    clickAtSec ++;
    coukiesAtSec += parseInt(localStorage.getItem("Clicking Power"));
    localStorage.setItem("coukiesAtSec", coukiesAtSec);

    // animation
    document.getElementById("bigCoukie").style.height = 400+"px";
    document.getElementById("bigCoukie").style.width = 440+"px";
    setTimeout(resizeCoukie, 100);
}

function resizeCoukie() {
    document.getElementById("bigCoukie").style.height = 500+"px";
    document.getElementById("bigCoukie").style.width = 550+"px";
}

/*
// animation
    let element = document.getElementById("bigCoukie");

    
    setTimeout(() => element.classList.remove('bounce'), 1000);
    function removeMiniBounce() {
        element.classList.remove("miniBounce");
    }
    element.onclick = () => {
    element.classList.add("miniBounce");
    setTimeout(removeMiniBounce, 1000);
    }*/

function Reset(chart1, chart2, chart3){
    localStorage.setItem("NC", 0);
    localStorage.setItem("Clicking Power", 1);
    localStorage.setItem("UpCost", 100);
    localStorage.setItem("GPS", 0);
    localStorage.setItem("CDC", 1);
    localStorage.setItem("CDS", 1);
    localStorage.setItem("CDG", 1);
    localStorage.setItem("CDP", 1);
    localStorage.setItem("CDCo", 1);

    chart1.clear();
    chart2.clear();
    chart3.clear();

    document.getElementById("NbrCoukies").textContent = localStorage.getItem("NC");
    document.getElementById("UPCLICK").textContent = "Upgrade Click Power price : 100";
    document.getElementById("upD").textContent = "boost : 1X";
    document.getElementById("GPS").textContent = "Gain auto : 0 coukies/s";

    for (i=0; i <= document.getElementsByClassName("CD"); i ++){
        document.getElementsByClassName("CD").textContent = origin_price[i];
    }

}

function speed() {
    localStorage.setItem("clickSpeed", clickAtSec)
    document.getElementById("CPS").textContent = localStorage.getItem("clickSpeed")+ "  click/s";
    if (bestCPS < localStorage.getItem("clickSpeed")){
        bestCPS = localStorage.getItem("clickSpeed");
        document.getElementById("BestCPS").textContent = bestCPS + "  click/s";
    }
    clickAtSec = 0;


    localStorage.setItem("coukiesAtSec", coukiesAtSec)
    document.getElementById("CoPS").textContent = localStorage.getItem("coukiesAtSec")+ "  coukies/s";
    if (bestCoPS < localStorage.getItem("coukiesAtSec")){
        bestCoPS = localStorage.getItem("coukiesAtSec");
        document.getElementById("BestCoPS").textContent = bestCoPS + "  coukies/s";
    }
    coukiesAtSec = 0;
}

function upgradePower(){
    
    let NC = localStorage.getItem("NC");
    let UpCost = localStorage.getItem("UpCost");

    if(NC >= parseInt(UpCost)) {
        /* change le nombre de cookie enstock prix - stock */
        localStorage.setItem("NC", NC - UpCost);
        document.getElementById("NbrCoukies").textContent = parseInt(localStorage.getItem("NC"));

        /* augmente le prix de l'amélioration */
        localStorage.setItem("UpCost", UpCost * 2.1);
        let a = localStorage.getItem("UpCost");
        let price = Math.round(a * 100) / 100;
        document.getElementById("UPCLICK").textContent = "Upgrade Click Power price : " + price;

        /* augmente la force de click */
        localStorage.setItem("Clicking Power", localStorage.getItem("Clicking Power") * 2);
        document.getElementById("upD").textContent = "power : " + localStorage.getItem("Clicking Power") + "X";

    } else {
        myMusic.play();
    }
    }

function COTI() {
    // ajoute x cookie au total par seconde (c'est les bots)
    localStorage.setItem("NC", parseInt(localStorage.getItem("NC")) + parseInt(localStorage.getItem("GPS")));
    document.getElementById("NbrCoukies").textContent = localStorage.getItem("NC");
    document.getElementById("GPS").textContent = "Gain auto : " + parseInt(localStorage.getItem("GPS")) + " coukies/s";
    coukiesAtSec += parseInt(localStorage.getItem("GPS"));
}

function CD(UpCost, Power, type) {
    let NC = localStorage.getItem("NC");
    UpCost *= localStorage.getItem(type);

    if (NC >= UpCost) {
        
        // change le nombre de cookie enstock prix - stock 
        localStorage.setItem("NC", NC - UpCost);
        document.getElementById("NbrCoukies").textContent = parseInt(localStorage.getItem("NC"));

        // ajout de la des cookie a la production par seconde GPS
        localStorage.setItem("GPS", parseInt(localStorage.getItem("GPS")) + Power);
        document.getElementById("NbrCoukies").textContent = localStorage.getItem("NC");
        
        // augmente le prix du coukies chief selectionner
        localStorage.setItem(type, localStorage.getItem(type) * 1.5);
        document.getElementById(type).textContent = parseInt(UpCost * 1.5);
} else {
    myMusic.play();
}}

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

function GoTo1v1(){
    window.location.href='1v1.html';
}

