import { isFocused } from "./Utils";

class HHPopup {
    static fillContent(content:string) {
        const elem = document.getElementById("HHAutoPopupGlobalContent");
        if(elem != null) elem.innerHTML=content;
    }
    static fillTitle(title:string) {
        const elem = document.getElementById("HHAutoPopupGlobalTitle");
        if(elem != null) elem.innerHTML=title;
    }
    static fillClasses(inClass:string) {
        const elem = document.getElementById("HHAutoPopupGlobalPopup");
        if(elem != null) elem.className=inClass;
    }
}

export function fillHHPopUp(inClass:string,inTitle:string, inContent:string)
{
    if (document.getElementById("HHAutoPopupGlobal") === null)
    {
        createHHPopUp();
    }
    else
    {
        displayHHPopUp();
    }
    HHPopup.fillContent(inContent);
    HHPopup.fillTitle(inTitle);
    HHPopup.fillClasses(inClass);
}

export function createHHPopUp()
{
    GM_addStyle('#HHAutoPopupGlobal.HHAutoOverlay { overflow: auto;  z-index:1000;   position: fixed;   top: 0;   bottom: 0;   left: 0;   right: 0;   background: rgba(0, 0, 0, 0.7);   transition: opacity 500ms;     display: flex;   align-items: center; }  '
    + '#HHAutoPopupGlobalPopup {   margin: auto;   padding: 20px;   background: #fff;   border-radius: 5px;   position: relative;   transition: all 5s ease-in-out; }  '
    + '#HHAutoPopupGlobalTitle {   margin-top: 0;   color: #333;   font-size: larger; } '
    + '#HHAutoPopupGlobalClose {   position: absolute;   top: 0;   right: 30px;   transition: all 200ms;   font-size: 50px;   font-weight: bold;   text-decoration: none;   color: #333; } '
    + '#HHAutoPopupGlobalClose:hover {   color: #06D85F; } '
    + '#HHAutoPopupGlobalContent .HHAutoScriptMenu .rowLine { display:flex;flex-direction:row;align-items:center;column-gap:20px;justify-content: center; } '
    + '#HHAutoPopupGlobalContent {   max-height: 30%;   overflow: auto;   color: #333;   font-size: x-small; }'
    + '#HHAutoPopupGlobalContent .HHAutoScriptMenu .switch {  width: 55px; height: 32px; }'
    + '#HHAutoPopupGlobalContent .HHAutoScriptMenu input:checked + .slider:before { -webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px); } '
    + '#HHAutoPopupGlobalContent .HHAutoScriptMenu .slider.round::before {  width: 22px; height: 22px; bottom: 5px; }'
    + '.PachinkoPlay {margin-top: 20px !important; }');

    let popUp = '<div id="HHAutoPopupGlobal" class="HHAutoOverlay">'
    +' <div id="HHAutoPopupGlobalPopup">'
    +'   <h2 id="HHAutoPopupGlobalTitle">Here i am</h2>'
    +'   <a id="HHAutoPopupGlobalClose">&times;</a>'
    +'   <div id="HHAutoPopupGlobalContent" class="content">'
    +'      Thank to pop me out of that button, but now im done so you can close this window.'
    +'   </div>'
    +' </div>'
    +'</div>';
    $('body').prepend(popUp);
    $("#HHAutoPopupGlobalClose").on("click", function(){
        maskHHPopUp();
    });
    document.addEventListener('keyup', evt => {
        if (evt.key === 'Escape')
        {
            maskHHPopUp();
        }
    });
}

export function isDisplayedHHPopUp()
{
    const popupGlobal = document.getElementById("HHAutoPopupGlobal");
    const popupGlobalPopup = document.getElementById("HHAutoPopupGlobalPopup");
    if (popupGlobal === null || popupGlobalPopup === null)
    {
        return false;
    }
    if (popupGlobal.style.display === "none")
    {
        return false;
    }
    return popupGlobalPopup.className;
}

export function displayHHPopUp()
{
    const popupGlobal = document.getElementById("HHAutoPopupGlobal");
    if (popupGlobal === null)
    {
        return false;
    }
    popupGlobal.style.display = "";
    popupGlobal.style.opacity = '1';
}

export function maskHHPopUp()
{
    const popupGlobal = document.getElementById("HHAutoPopupGlobal");
    if (popupGlobal !== null)
    {
        popupGlobal.style.display = "none";
        popupGlobal.style.opacity = '0';
    }
}

export function checkAndClosePopup(inBurst)
{
    const popUp = $('#popup_message[style*="display: block"]');
    if ((inBurst || isFocused()) && popUp.length > 0)
    {
        $('close', popUp).click();
    }
}