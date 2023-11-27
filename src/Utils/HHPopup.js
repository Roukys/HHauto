import { isFocused } from "./Utils";

export function fillHHPopUp(inClass,inTitle, inContent)
{
    if (document.getElementById("HHAutoPopupGlobal") === null)
    {
        createHHPopUp();
    }
    else
    {
        displayHHPopUp();
    }
    document.getElementById("HHAutoPopupGlobalContent").innerHTML=inContent;
    document.getElementById("HHAutoPopupGlobalTitle").innerHTML=inTitle;
    document.getElementById("HHAutoPopupGlobalPopup").className =inClass;
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
    document.getElementById("HHAutoPopupGlobalClose").addEventListener("click", function(){
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
    if (document.getElementById("HHAutoPopupGlobal") === null)
    {
        return false;
    }
    if (document.getElementById("HHAutoPopupGlobal").style.display === "none")
    {
        return false;
    }
    return document.getElementById("HHAutoPopupGlobalPopup").className;
}

export function displayHHPopUp()
{
    if (document.getElementById("HHAutoPopupGlobal") === null)
    {
        return false;
    }
    document.getElementById("HHAutoPopupGlobal").style.display = "";
    document.getElementById("HHAutoPopupGlobal").style.opacity = 1;
}

export function maskHHPopUp()
{
    document.getElementById("HHAutoPopupGlobal").style.display = "none";
    document.getElementById("HHAutoPopupGlobal").style.opacity = 0;
}

export function checkAndClosePopup(inBurst)
{
    const popUp = $('#popup_message[style*="display: block"]');
    if ((inBurst || isFocused()) && popUp.length > 0)
    {
        $('close', popUp).click();
    }
}