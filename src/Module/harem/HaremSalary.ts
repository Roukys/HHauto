import {
    checkTimer,
    ConfigHelper,
    getPage,
    getStoredValue,
    setStoredValue,
    setTimer,
    randomInterval,
    getHHVars,
    getHero,
    convertTimeToInt,
    TimeHelper
} from '../../Helper/index';
import { gotoPage } from '../../Service/index';
import { getCurrentSorting, getHHAjax, logHHAuto } from '../../Utils/index';
import { HHStoredVarPrefixKey } from '../../config/index';
import { Harem } from "./Harem";
import { HaremFilter } from './HaremFilter';

export class HaremSalary {
    static filterGirlMapReadyForCollect(a)
    {
        return a.readyForCollect;
    }

    static scrollToGirl(girlId: string){
        try {
            // Scroll to girl
            $('[id_girl="' + girlId + '"]')[0].scrollIntoView();
        } catch (err) {
            // Girl must not be visible, scroll to girl list bottom
            HaremSalary.scrollToLastGirl();
        }
    }

    static scrollToLastGirl(){
        try {
            $('.girls_list')[0].scrollTop = $('.girls_list')[0].scrollHeight;
        } catch (err) { }
    }

    static async CollectMoney ()
    {
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        var Clicked:any[]=[];
        const Hero = getHero();
        const haremFilter = new HaremFilter();
        const haremFilters: any[] = haremFilter.getRarityFilterValues();
        let haremFilterIndex = 0;
        let salaryTimer = Infinity;

        var endCollectTS = -1;
        let startCollectTS = -1;
        var maxSecsForSalary = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalaryMaxTimer")) || 1200;
        var collectedGirlzNb = 0;
        var collectedMoney = 0;
        let totalGirlsToCollect = 0; // TODO update when loading a new "page"
        let totalGirlsDisplayed = 0;
        let girlsToCollectBeforeWait = randomInterval(6,12);
        let girlPageCollecting = 1;
        let lastGirlScrolledTo = -1;
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
                HaremSalary.scrollToGirl(Clicked[0]);
                var params = {
                    class: "Girl",
                    id_girl: Clicked[0],
                    action: "get_salary"
                };
                getHHAjax()(params, function(data) {
                    if (data.success)
                    {
                        //console.log(Clicked[0]);
                        let girlsDataList = getHHVars("shared.GirlSalaryManager.girlsMap");
                        if (girlsDataList !== null && girlsDataList[Clicked[0]] !== undefined)
                        {
                            const _this2 = girlsDataList[Clicked[0]];
                            _this2.gData.pay_in = data.time + 60;
                            _this2._noDoubleClick = false;
                            _this2._resetSalaryDisplay();
                            //console.log(_this2);
                        }
                        Hero.update("soft_currency", data.money, true);
                        // unsafeWindow.Collect.check_state(); // Update money in button based on filtered girls
                        collectedMoney += data.money;
                        collectedGirlzNb++;
                    }
                    else
                    {
                        logHHAuto(`Collect error on n°${Clicked[0]}`);
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
                        logHHAuto(`Next girl collection in ${waitBetweenGirlsTime}ms after n°${Clicked[0]}`);
                        setTimeout(ClickThem,waitBetweenGirlsTime);
                        if(window.top) window.top.postMessage({ImAlive:true},'*');
                    }
                    else
                    {
                        logHHAuto(`Salary collection reached to the max time of ${maxSecsForSalary} secs, collected ${collectedGirlzNb}/${ totalGirlsToCollect} girls and ${collectedMoney} money`);
                        setTimeout(CollectData,randomInterval(300,500));
                    }
                },
                function(err) {
                    Clicked.shift();
                    logHHAuto(`Bypassed n°${Clicked[0]}`);
                    setTimeout(ClickThem,randomInterval(300,500));
                });
            }
            else {

                const collectionTime = Math.ceil((new Date().getTime() - startCollectTS)/1000);
                logHHAuto(`Salary collection done for page n°${girlPageCollecting} : collected ${collectedGirlzNb} / ${totalGirlsToCollect} girls and ${collectedMoney} money in ${collectionTime} secs`);
                setTimeout(()=>{CollectData(true)},randomInterval(300,500));
                girlPageCollecting++;
            }
        }
    
        function CollectData(inStart = false)
        {
            let collectableGirlsList:any[] = [];
            const girlsList = Harem.getGirlMapSorted(getCurrentSorting(), false);
            const salarySumTag = HaremSalary.getSalarySumTag();
            if (girlsList === null) {
                if (getPage() != ConfigHelper.getHHScriptVars("pagesIDHarem")) {
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHarem"));
                    return;
                } else {
                    logHHAuto('Error getting girl list');
                }
            }
            collectableGirlsList = girlsList?.filter(HaremSalary.filterGirlMapReadyForCollect) || [];

            const allOwnedGirlsLoaded = totalGirlsDisplayed > 0 && totalGirlsDisplayed === girlsList.length;
            totalGirlsDisplayed = girlsList.length;
            totalGirlsToCollect = collectableGirlsList.length;
    
            if (collectableGirlsList.length>0 )
            {
                //console.log(JSON.stringify(collectableGirlsList));
                for ( let girl of collectableGirlsList)
                {
                    Clicked.push(girl.gId);
                }
                if (debugEnabled) logHHAuto({log:"Girls ready to collect: ", GirlsToCollect:Clicked});
            }
            if (Clicked.length>0 && inStart)
            {
                setTimeout(ClickThem,randomInterval(500,1500));
            }
            else if (salarySumTag && inStart && !allOwnedGirlsLoaded) {
                // Some money to collect, scrolling
                const girlIdToLoad = Number($('.girls_list .harem-girl:not(.not_owned)').last().attr('girl'));
                if (lastGirlScrolledTo != girlIdToLoad) {
                    lastGirlScrolledTo = girlIdToLoad;
                    logHHAuto(`Some salary need to be collected in next pages, scroll down to ${girlIdToLoad}`);
                    HaremSalary.scrollToGirl(girlIdToLoad+'');
                } else {
                    logHHAuto(`Some salary need to be collected in next pages, same girl as before, scroll down to bottom`);
                    HaremSalary.scrollToLastGirl();
                }
                setTimeout(() => { CollectData(inStart) }, randomInterval(1200, 1800));
            }
            else //nothing to collect or time spent already
            {
                salaryTimer = Math.min(HaremSalary.predictNextSalaryMinTime(), salaryTimer);

                if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryUseFilter") === "true" && haremFilterIndex < haremFilters.length) {
                    haremFilter.selectGirlRarity(haremFilters[haremFilterIndex++]);
                    setTimeout(() => { CollectData(inStart) }, randomInterval(1200, 1800));
                } else {
                    if (salaryTimer > 0)
                    {
                        salaryTimer = randomInterval(salaryTimer, 180 + salaryTimer);
                        logHHAuto(`Setting salary timer to ${salaryTimer} secs.`);
                    }
                    else
                    {
                        logHHAuto("Next salary set to 60 secs as remains girls to collect");
                        salaryTimer = randomInterval(50, 70);
                    }
                    setTimer('nextSalaryTime', salaryTimer);
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"),{}, randomInterval(300,500));
                }
            }
        }

        if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryUseFilter") === "true" && haremFilterIndex < haremFilters.length) {
            haremFilter.openFilter();
            await TimeHelper.sleep(randomInterval(200, 400)); // wait open

            logHHAuto('Reseting girl filters');
            haremFilter.resetFilter();
            await TimeHelper.sleep(randomInterval(800, 1200)); // wait loading
            await haremFilter.selectOnlyOwnedGirls();
            await haremFilter.selectGirlRarity(haremFilters[haremFilterIndex++]);
        }
        else if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryResetFilters") === "true")
        {
            logHHAuto('Reseting girl filters');
            haremFilter.resetFilter();
            await TimeHelper.sleep(randomInterval(800, 1200)); // wait loading
        }
    
        CollectData(true);
    }

    static getNextSalaryTimeFromHomePage(): number
    {
        const salaryTimer = $('.pay-in:visible', HaremSalary.getSalaryButton());
        if (salaryTimer.length > 0) {
            return convertTimeToInt(salaryTimer.text()) || -1;
        }
        return -1;
    }

    static setSalaryTimeFromHomePage(): void
    {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            const minSalaryForCollect = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryMinSalary")) || 20000;
            const salaryAmount = Number($('.sum', HaremSalary.getSalaryButton()).attr('amount'));

            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryResetFilters") === "true" 
                && salaryAmount > minSalaryForCollect)
            {
                logHHAuto(`Some salary to be collected ${salaryAmount}`);
                setTimer('nextSalaryTime', randomInterval(1, 10));
                return;
            }
            const nextSalaryTime = HaremSalary.getNextSalaryTimeFromHomePage();
            if (nextSalaryTime > 0)
                setTimer('nextSalaryTime', randomInterval(nextSalaryTime, 60 + nextSalaryTime));
        }
    }
    
    static predictNextSalaryMinTime(): number
    {
        let girlsDataList = getHHVars("shared.GirlSalaryManager.girlsMap");
        if (girlsDataList === null)
        {
            girlsDataList = getHHVars("girlsDataList");
        }
        let nextCollect = 0;
        const minSalaryForCollect = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalaryMinSalary")) || 20000;
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
                if ((girl as any).shards >= 100) {
                    currentCollectSalary += (girl as any).salary;
                    nextCollect = (girl as any).pay_in;
                    if (currentCollectSalary > minSalaryForCollect)
                    {
                        break;
                    }
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

    static getSalaryButton() {
        return $("#collect_all_container button[id='collect_all']");
    }

    static getSalarySumTag(): number {
        const salaryButton = HaremSalary.getSalaryButton();
        let salarySumTag = NaN;
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem")) {
            salarySumTag = Number($('[rel="next_salary"]', salaryButton)[0].innerText.replace(/[^0-9]/gi, ''));
        }
        else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            salarySumTag = Number($('.sum', salaryButton).attr("amount"));
        }
        return salarySumTag;
    }
    
    static getSalary() {
        try {
            if(getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem") || getPage() === ConfigHelper.getHHScriptVars("pagesIDHome"))
            {
                const salaryButton = HaremSalary.getSalaryButton();
                const salaryToCollect = !(salaryButton.prop('disabled') || salaryButton.attr("style")==="display: none;");
                const getButtonClass:string = salaryButton.attr("class") || '';
                const salarySumTag = HaremSalary.getSalarySumTag();
    
                const enoughSalaryToCollect = Number.isNaN(salarySumTag)?true:salarySumTag > Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalaryMinSalary") || 20000);
                //console.log(salarySumTag, enoughSalaryToCollect);
                if (salaryToCollect && enoughSalaryToCollect )
                {
                    if (getButtonClass.indexOf("blue_button_L") !== -1 )
                    {
                        //replaceCheatClick();
                        salaryButton.trigger('click');
                        logHHAuto('Collected all Premium salary');
                        let nextSalaryTime = -1;
                        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem")) {
                            nextSalaryTime = HaremSalary.predictNextSalaryMinTime();
                        }
                        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
                            nextSalaryTime = HaremSalary.getNextSalaryTimeFromHomePage();
                        }
                        if (nextSalaryTime > 0) setTimer('nextSalaryTime', randomInterval(nextSalaryTime, 60 + nextSalaryTime));
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
                    const nextSalaryTime = HaremSalary.predictNextSalaryMinTime();
                    setTimer('nextSalaryTime', randomInterval(nextSalaryTime, 180 + nextSalaryTime));
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