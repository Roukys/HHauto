import {
    checkTimer,
    ConfigHelper,
    getPage,
    getStoredValue,
    setStoredValue,
    setTimer,
    randomInterval,
    getHHVars,
    getHero
} from '../Helper/index';
import { gotoPage } from '../Service/index';
import { getCurrentSorting, logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { Harem } from "./Harem";

export class HaremSalary {
    static filterGirlMapReadyForCollect(a)
    {
        return a.readyForCollect;
    }

    static CollectMoney ()
    {
        var Clicked:any[]=[];
        const Hero = getHero();
        //var ToClick=[];
        var endCollectTS = -1;
        let startCollectTS = -1;
        var maxSecsForSalary = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalaryMaxTimer"));
        var collectedGirlzNb = 0;
        var collectedMoney = 0;
        let totalGirlsToCollect = 0;
        let girlsToCollectBeforeWait = randomInterval(6,12);
        function ClickThem()
        {
            if (endCollectTS === -1)
            {
                endCollectTS = new Date().getTime() + 1000 * maxSecsForSalary;
                startCollectTS = new Date().getTime();
            }
            //logHHAuto('Need to click: '+ToClick.length);
            if (Clicked.length>0)
            {
    
                //logHHAuto('clicking N '+ToClick[0].formAction.split('/').last())
                //console.log($(ToClick[0]));
                //$(ToClick[0]).click();
                try{
                    // Scroll to girl
                    $('[id_girl="'+Clicked[0]+'"]')[0].scrollIntoView();
                } catch (err) {
                    try{
                        // Girl must not be visible, scroll to girl list bottom
                        $('.girls_list')[0].scrollTop = $('.girls_list')[0].scrollHeight;
                    }catch (err) {}
                }
                var params = {
                    class: "Girl",
                    id_girl: Clicked[0],
                    action: "get_salary"
                };
                unsafeWindow.hh_ajax(params, function(data) {
                    if (data.success)
                    {
                        //console.log(Clicked[0]);
                        let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
                        if (girlsDataList !== null && girlsDataList[Clicked[0]] !== undefined)
                        {
                            const _this2 = girlsDataList[Clicked[0]];
                            _this2.gData.pay_in = data.time + 60;
                            _this2._noDoubleClick = false;
                            _this2._resetSalaryDisplay();
                            //console.log(_this2);
                        }
                        Hero.update("soft_currency", data.money, true);
                        //movingStars(event, "$");
                        unsafeWindow.Collect.check_state();
                        collectedMoney += data.money;
                        collectedGirlzNb++;
                    }
                    else
                    {
                        logHHAuto("Collect error on n°"+Clicked[0]);
                    }
                    Clicked.shift();
                    if (new Date().getTime() < endCollectTS)
                    {
                        let waitBetweenGirlsTime = randomInterval(300,500);
                        girlsToCollectBeforeWait--;
                        if (girlsToCollectBeforeWait <= 0)
                        {
                            waitBetweenGirlsTime = randomInterval(1200,2000);
                            girlsToCollectBeforeWait = randomInterval(6,12);
                        }
                        logHHAuto("Next girl collection in " + waitBetweenGirlsTime + "ms after n°"+Clicked[0]);
                        setTimeout(ClickThem,waitBetweenGirlsTime);
                        if(window.top) window.top.postMessage({ImAlive:true},'*');
                    }
                    else
                    {
                        logHHAuto('Salary collection reached to the max time of '+maxSecsForSalary+' secs, collected '+collectedGirlzNb+'/'+totalGirlsToCollect+' girls and '+collectedMoney+' money');
                        setTimeout(CollectData,randomInterval(300,500));
                    }
                },
                        function(err) {
                    Clicked.shift();
                    logHHAuto("Bypassed n°"+Clicked[0]);
                    setTimeout(ClickThem,randomInterval(300,500));
                });
                //collectedMoney += $('span.s_value',$(ToClick[0])).length>0?Number($('span.s_value',$(ToClick[0]))[0].innerText.replace(/[^0-9]/gi, '')):0;
                //collectedGirlzNb++;
                //logHHAuto('will click again');
                //console.log(new Date().getTime(),endCollectTS,new Date().getTime() < endCollectTS);
            }
            else
            {
                const collectionTime = Math.ceil((new Date().getTime() - startCollectTS)/1000);
                logHHAuto(`Salary collection done : collected ${collectedGirlzNb} / ${totalGirlsToCollect} girls and ${collectedMoney} money in ${collectionTime} secs`);
                setTimeout(CollectData,randomInterval(300,500));
            }
        }
    
        function CollectData(inStart = false)
        {
            let collectableGirlsList:any[] = [];
            const girlsList = Harem.getGirlMapSorted(getCurrentSorting(), false);
            if ( girlsList === null)
            {
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
            collectableGirlsList = girlsList.filter(HaremSalary.filterGirlMapReadyForCollect);
    
            totalGirlsToCollect = collectableGirlsList.length;
    
            if (collectableGirlsList.length>0 )
            {
                //console.log(JSON.stringify(collectableGirlsList));
                for ( let girl of collectableGirlsList)
                {
                    Clicked.push(girl.gId);
                }
                logHHAuto({log:"Girls ready to collect: ", GirlsToCollect:Clicked});
            }
            if (Clicked.length>0 && inStart)
            {
                setTimeout(ClickThem,randomInterval(500,1500));
            }
            else//nothing to collect or time spent already
            {
                let salaryTimer = HaremSalary.predictNextSalaryMinTime();
                if (salaryTimer > 0)
                {
                    logHHAuto("Setting salary timer to "+salaryTimer+" secs.");
                }
                else
                {
                    // logHHAuto("Next salary set to 60 secs as remains girls to collect");
                    // salaryTimer = 60;
                    logHHAuto("Next salary set to 15 min");
                    salaryTimer = 15 * 60;
                }
                setTimer('nextSalaryTime', randomInterval(salaryTimer, 180 + salaryTimer));
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"),{}, randomInterval(300,500));
            }
        }
    
        CollectData(true);
    }
    
    static predictNextSalaryMinTime()
    {
        let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
        if (girlsDataList === null)
        {
            girlsDataList = getHHVars("girlsDataList");
        }
        let nextCollect = 0;
        const minSalaryForCollect = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalaryMinSalary"));
        let currentCollectSalary = 0;
        if (girlsDataList !== null && !Number.isNaN(minSalaryForCollect))
        {
            let girlsSalary = Object.values(girlsDataList).sort(sortByPayIn);
            for (let i of girlsSalary)
            {
                let girl = i;
                if ((i as any).gData)
                {
                    girl = (i as any).gData;
                }
                currentCollectSalary += (girl as any).salary;
                nextCollect = (girl as any).pay_in;
                if (currentCollectSalary > minSalaryForCollect)
                {
                    break;
                }
            }
        }
        return nextCollect;
    
        function sortByPayIn(a, b)
        {
            let aPay = a.pay_in?a.pay_in:a.gData.pay_in;
            let bPay = b.pay_in?b.pay_in:b.gData.pay_in;
            return aPay - bPay;
        }
    }
    
    static getSalary() {
        try {
            if(getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem") || getPage() === ConfigHelper.getHHScriptVars("pagesIDHome"))
            {
                const salaryButton = $("#collect_all_container button[id='collect_all']")
                const salaryToCollect = !(salaryButton.prop('disabled') || salaryButton.attr("style")==="display: none;");
                const getButtonClass:string = salaryButton.attr("class") || '';
                let salarySumTag = NaN;
                if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem"))
                {
                    salarySumTag = Number($('[rel="next_salary"]',salaryButton)[0].innerText.replace(/[^0-9]/gi, ''));
                }
                else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome"))
                {
                    salarySumTag = Number($('.sum',salaryButton).attr("amount"));
                }
    
                const enoughSalaryToCollect = Number.isNaN(salarySumTag)?true:salarySumTag > Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalaryMinSalary"));
                //console.log(salarySumTag, enoughSalaryToCollect);
                if (salaryToCollect && enoughSalaryToCollect )
                {
                    if (getButtonClass.indexOf("blue_button_L") !== -1 )
                    {
                        //replaceCheatClick();
                        salaryButton.click();
                        logHHAuto('Collected all Premium salary');
                        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem") )
                        {
                            const nexstSalaryTime = HaremSalary.predictNextSalaryMinTime();
                            setTimer('nextSalaryTime', randomInterval(nexstSalaryTime, 180 + nexstSalaryTime));
                        }
                        return false;
                    }
                    else if ( getButtonClass.indexOf("orange_button_L") !== -1 )
                    {
                        // Not at Harem screen then goto the Harem screen.
                        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem") )
                        {
                            logHHAuto("Detected Harem Screen. Fetching Salary");
                            //replaceCheatClick();
                            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                            logHHAuto("setting autoloop to false");
                            HaremSalary.CollectMoney();
                        }
                        else
                        {
                            logHHAuto("Navigating to Harem window.");
                            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHarem"));
                        }
                        return true;
                    }
                    else
                    {
                        logHHAuto("Unknown salary button color : "+getButtonClass);
                        setTimer('nextSalaryTime', randomInterval(60, 70));
                    }
                }
                else if (!salaryToCollect)
                {
                    logHHAuto("No salary to collect");
                    const nexstSalaryTime = HaremSalary.predictNextSalaryMinTime();
                    setTimer('nextSalaryTime', randomInterval(nexstSalaryTime, 180 + nexstSalaryTime));
                }
                else
                {
                    logHHAuto("Not enough salary to collect, wait 15min");
                    setTimer('nextSalaryTime', randomInterval(15*60, 17*60));
                }
            }
            else
            {
                // Not at Harem screen then goto the Harem screen nor home page.
                if (checkTimer('nextSalaryTime'))
                {
                    logHHAuto("Navigating to Harem page");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHarem"));
                    return true;
                }
            }
        }
        catch (ex) {
            logHHAuto("Catched error : Could not collect salary... " + ex);
            setTimer('nextSalaryTime', randomInterval(3600, 4200));
            // return not busy
            return false;
        }
        return false;
    }
}