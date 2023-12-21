import {
    RewardHelper,
    TimeHelper,
    ConfigHelper,
    getPage,
    getStoredValue,
    randomInterval,
    setStoredValue,
    setTimer
} from '../Helper/index';
import { autoLoop, gotoPage } from "../Service/index";
import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';

export class Bundles {
    static goAndCollectFreeBundles()
    {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome"))
        {
            if(getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreeBundlesCollect") !== "true") {
                logHHAuto("Error autoFreeBundlesCollect not activated.");
                return;
            }
            const plusButton = $("header .currency .reversed_tooltip");
            if(plusButton.length > 0) {
                logHHAuto("click button for popup.");
                plusButton[0].click();
            }
            else
            {
                logHHAuto("No button for popup. Try again in 5h.");
                setTimer('nextFreeBundlesCollectTime', randomInterval(4*60*60,6*60*60));
                return false;
            }
            logHHAuto("setting autoloop to false");
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            const bundleTabsContainerQuery = "#popups .payments-wrapper .payment-tabs";
            const bundleTabsListQuery = '.event_bundles, .special_offers, .period_deal';
            const subTabsQuery= "#popups .payments-wrapper .content-container .subtabs-container .card-container";
            const freeButtonBundleQuery= "#popups .payments-wrapper .bundle .bundle-offer-price .blue_button_L:enabled[price='0.00']";

            function collectFreeBundlesFinished(message, nextFreeBundlesCollectTime) {
                logHHAuto(message);
                setTimer('nextFreeBundlesCollectTime', nextFreeBundlesCollectTime);
                $("#popups .close_cross").click(); // Close popup
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                logHHAuto("setting autoloop to true");
                setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")));
            }

            function parseAndCollectFreeBundles(){

                const freeBundlesNumber=$(freeButtonBundleQuery).length;
                if(freeBundlesNumber > 0)
                {
                    logHHAuto("Free Bundles found: " + freeBundlesNumber);
                    let buttonsToCollect:HTMLElement[] = [];
                    for (let currentBundle = 0; currentBundle < freeBundlesNumber ; currentBundle++)
                    {
                        buttonsToCollect.push($(freeButtonBundleQuery)[currentBundle]);
                    }

                    function collectFreeBundle()
                    {
                        if (buttonsToCollect.length > 0)
                        {
                            logHHAuto("Collecting bundle n°"+ buttonsToCollect[0].getAttribute('product'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(RewardHelper.closeRewardPopupIfAny, randomInterval(500,800));
                            setTimeout(switchToBundleTabs, randomInterval(1500,2500));
                        }
                    }
                    collectFreeBundle();
                    return true;
                } else {
                    return false;
                }
            }

            function switchToBundleTabs() {
                const bundleTabs = $(bundleTabsListQuery, $(bundleTabsContainerQuery));
                if(bundleTabs.length > 0) {
                    let freeBundleFound = false;
                    for(let bundleIndex = 0;bundleIndex < bundleTabs.length && !freeBundleFound;bundleIndex++)
                    {
                        bundleTabs[bundleIndex].click();
                        logHHAuto("Looking in tabs '" + $(bundleTabs[bundleIndex]).attr('type') + "'.");
                        freeBundleFound = parseAndCollectFreeBundles();
                        if (!freeBundleFound && $(subTabsQuery).length > 0) {
                            const subTabs = $(subTabsQuery);
                            logHHAuto("Sub tabs found, switching to next one");
                            for(let subTabIndex = 1;subTabIndex < subTabs.length && !freeBundleFound;subTabIndex++)
                            {
                                subTabs[subTabIndex].click();
                                logHHAuto("Looking in sub tabs '" + $(subTabs[subTabIndex]).attr('period_deal') + "'.");
                                freeBundleFound = parseAndCollectFreeBundles();
                            }
                        }
                    }
                    if(!freeBundleFound) collectFreeBundlesFinished("Free bundle collection finished.", TimeHelper.getSecondsLeftBeforeEndOfHHDay() + randomInterval(3600, 4000));
                }
                else
                {
                    collectFreeBundlesFinished("No bundle tabs in popup, wait one hour.", 60 * 60);
                    return false;
                }
            }

            // Wait popup is opened
            setTimeout(switchToBundleTabs,randomInterval(1400, 1800));

            return true;
        }
        else
        {
            logHHAuto("Navigating to home page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            // return busy
            return true;
        }
    }
}