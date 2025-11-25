import {
    checkTimer,
    ConfigHelper,
    getPage,
    getStoredValue,
    setTimer,
    randomInterval,
    getHHVars
} from '../../Helper/index';
import { gotoPage } from '../../Service/index';
import { logHHAuto } from '../../Utils/index';
import { HHStoredVarPrefixKey } from '../../config/index';

export class HaremSalary {
    static filterGirlMapReadyForCollect(a)
    {
        return a.readyForCollect;
    }

    static setSalaryTimeFromHomePage(): void
    {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            const minSalaryForCollect = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryMinSalary")) || 20000;
            const salaryAmount = HaremSalary.getSalarySumTag();

            if (salaryAmount > minSalaryForCollect)
            {
                logHHAuto(`Some salary to be collected ${salaryAmount}`);
                setTimer('nextSalaryTime', randomInterval(1, 10));
                return;
            }
            const nextSalaryTime = HaremSalary.predictNextSalaryMinTime();
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
                if ((girl as any).salary > 0) {
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
            salarySumTag = Number(getHHVars("salary_collect"));
        }
        return salarySumTag;
    }
    
    static getSalary() {
        try {
            if(getPage() === ConfigHelper.getHHScriptVars("pagesIDHome"))
            {
                const salaryButton = HaremSalary.getSalaryButton();
                const salaryToCollect = !(salaryButton.prop('disabled') || salaryButton.attr("style")==="display: none;");
                const getButtonClass:string = salaryButton.attr("class") || '';
                const salarySumTag = HaremSalary.getSalarySumTag();
    
                const enoughSalaryToCollect = Number.isNaN(salarySumTag)?true:salarySumTag > Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalaryMinSalary") || 20000);
                //console.log(salarySumTag, enoughSalaryToCollect);
                if (salaryToCollect && enoughSalaryToCollect )
                {
                    if (getButtonClass.indexOf("blue_button_L") !== -1 || getButtonClass.indexOf("round_blue_button") !== -1)
                    {
                        salaryButton.trigger('click');
                        logHHAuto('Collected all salary');
                        let nextSalaryTime = -1;
                        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem") || getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
                            nextSalaryTime = HaremSalary.predictNextSalaryMinTime();
                        }
                        if (nextSalaryTime > 0) {
                            setTimer('nextSalaryTime', randomInterval(nextSalaryTime, 60 + nextSalaryTime));
                        } else {
                            logHHAuto("Can't predict next salary time, wait 15min");
                            setTimer('nextSalaryTime', randomInterval(15 * 60, 17 * 60));
                        }
                        return false;
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
                // Not at Harem screen then goto home page.
                if (checkTimer('nextSalaryTime'))
                {
                    logHHAuto("Navigating to Home page");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
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