// ==UserScript==
// @name         HaremHeroes Login
// @namespace    https://github.com/Roukys/HHauto
// @version      0.1
// @description  AutoLogin
// @author       RuperSama
// @match        http*://eggs-ext.kinkoid.com/*
// @match        http*://*.hentaiheroes.com/*
// @grant        none
// ==/UserScript==

var userEmail = ""; //User Email
var userPass = ""; //User Account

//This function insert the user info in the ifram
function login(){
    var email = document.getElementById("auth-email");
    var pass = document.getElementById("auth-password");
    email.value = userEmail;
    pass.value = userPass;
    //Delay for make the text value be writed
    setTimeout(submitlogin,3000);
}

//Press the sumit button for end the login
function submitlogin()
{
    var btn = document.getElementById("submit-authenticate");
    btn.click();
}

//This function is triger when you are in the login page, searching for the connect button
function hhFrame(){
    var iframe = document.getElementById("hh_game");
    if(iframe == null) return;
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var btns = innerDoc.getElementsByClassName("igreen");
    if(btns.length > 0){
        btns[0].click();
    }
}

//This script work in the main HH page and the iframe for login
function load(){
    //Dont waste resource if the script is incompleted
    if(userEmail == "" || userPass == "") return;

    try{
        if(window.location.href.includes("kinkoid")){
            setTimeout(login,5000);
        }
        else{
            setTimeout(hhFrame,5000);
        }
    }catch(error){
        setTimeout(load,2000);
    }

}

//Triger afther the page is load
window.onload = load();