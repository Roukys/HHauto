import { getStoredValue } from "../Helper";

export function manageToolTipsDisplay(important=false)
{

    if(getStoredValue("HHAuto_Setting_showTooltips") === "true")
    {
        enableToolTipsDisplay(important);
    }
    else
    {
        disableToolTipsDisplay(important);
    }
}

export function enableToolTipsDisplay(important=false)
{
    const importantAddendum = important?'; !important':'';
    GM_addStyle('.tooltipHH:hover span.tooltipHHtext { border:1px solid #ffa23e; border-radius:5px; padding:5px; display:block; z-index: 100; position: absolute; width: 150px; color:black; text-align:center; background:white;  opacity:0.9; transform: translateY(-100%)'+importantAddendum+'}');
}

export function disableToolTipsDisplay(important=false)
{
    const importantAddendum = important?'; !important':'';
    GM_addStyle('.tooltipHH:hover span.tooltipHHtext { display: none'+importantAddendum+'}');
}