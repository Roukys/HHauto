import { fillHHPopUp, logHHAuto } from "../Utils";
import { HHEnvVariables, HHKnownEnvironnements } from "../config";

export function getHHScriptVars(id, logNotFound = true)
{
    let environnement = "global";
    if (HHKnownEnvironnements[window.location.hostname] !== undefined)
    {
        environnement= HHKnownEnvironnements[window.location.hostname].name;
    }
    else
    {
        fillHHPopUp("unknownURL","Game URL unknown",'<p>This HH URL is unknown to the script.<br>To add it please open an issue in <a href="https://github.com/Roukys/HHauto/issues" target="_blank">Github</a> with following informations : <br>Hostname : '+window.location.hostname+'<br>gameID : '+$('body[page][id]').attr('id')+'<br>You can also use this direct link : <a  target="_blank" href="https://github.com/Roukys/HHauto/issues/new?template=enhancement_request.md&title=Support%20for%20'+window.location.hostname+'&body=Please%20add%20new%20URL%20with%20these%20infos%20%3A%20%0A-%20hostname%20%3A%20'+window.location.hostname+'%0A-%20gameID%20%3A%20'+$('body[page][id]').attr('id')+'%0AThanks">Github issue</a></p>');
    }
    if (HHEnvVariables[environnement] !== undefined && HHEnvVariables[environnement][id] !== undefined)
    {
        return HHEnvVariables[environnement][id];
    }
    else
    {
        if (HHEnvVariables["global"] !== undefined && HHEnvVariables["global"][id] !== undefined )
        {
            return HHEnvVariables["global"][id];
        }
        else
        {
            if (logNotFound)
            {
                logHHAuto("not found var for "+environnement+"/"+id);
            }
            return null;
        }
    }
}