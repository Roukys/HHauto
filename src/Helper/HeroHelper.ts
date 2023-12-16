import { autoLoop } from '../Service/index';
import { isJSON, logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';
import { getHHVars } from "./HHHelper";
import { getStoredValue, setStoredValue } from "./StorageHelper";
import { randomInterval } from "./TimeHelper";

export function getHero()
{
    if(unsafeWindow.Hero === undefined)
    {
        setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")))
        //logHHAuto(window.wrappedJSObject)
    }
    //logHHAuto(unsafeWindow.Hero);
    return unsafeWindow.Hero;
}

export function doStatUpgrades()
{
    //Stats?
    //logHHAuto('stats');
    var Hero=getHero();
    var stats=[getHHVars('Hero.infos.carac1'),getHHVars('Hero.infos.carac2'),getHHVars('Hero.infos.carac3')];
    var money=getHHVars('Hero.currencies.soft_currency');
    var count=0;
    var M=Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoStats"));
    var MainStat=stats[getHHVars('Hero.infos.class')-1];
    var Limit=getHHVars('Hero.infos.level')*30;//getHHVars('Hero.infos.level')*19+Math.min(getHHVars('Hero.infos.level'),25)*21;
    var carac=getHHVars('Hero.infos.class');
    var mp=0;
    var mults=[60,30,10,1];
    for (var car=0; car<3; car++)
    {
        //logHHAuto('stat '+carac);
        var s=stats[carac-1];
        for (var mu=0;mu<5;mu++)
        {
            var mult=mults[mu];
            var price = 5+s*2+(Math.max(0,s-2000)*2)+(Math.max(0,s-4000)*2)+(Math.max(0,s-6000)*2)+(Math.max(0,s-8000)*2);
            price*=mult;
            if (carac==getHHVars('Hero.infos.class'))
            {
                mp=price;
            }
            //logHHAuto('money: '+money+' stat'+carac+': '+stats[carac-1]+' price: '+price);
            if ((stats[carac-1]+mult)<=Limit && (money-price)>M && (carac==getHHVars('Hero.infos.class') || price<mp/2 || (MainStat+mult)>Limit))
            {
                count++;
                logHHAuto('money: '+money+' stat'+carac+': '+stats[carac-1]+' [+'+mult+'] price: '+price);
                money-=price;
                var params = {
                    carac: "carac" + carac,
                    action: "hero_update_stats",
                    nb: mult
                };
                unsafeWindow.hh_ajax(params, function(data) {
                    Hero.update("soft_currency", 0 - price, true);
                });
                setTimeout(doStatUpgrades, randomInterval(300,500));
                return;
                break;
            }
        }
        carac=(carac+1)%3+1;
    }
}

export class HeroHelper {
    static haveBoosterInInventory(idBooster) {
        const HaveBooster=isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_haveBooster"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_haveBooster")):{};
        const boosterOwned = HaveBooster.hasOwnProperty(idBooster) ? Number(HaveBooster[idBooster]) : 0;
        return boosterOwned > 0
    }

    static async equipBooster(booster) {
        logHHAuto("Not yet enough tested, do not use");
        if(!booster) return Promise.resolve(false);
        if(!HeroHelper.haveBoosterInInventory(booster.identifier)) {
            logHHAuto("Boostrer" + booster + " not in inventory");
            return Promise.resolve(false);
        }
        //action=market_equip_booster&id_item=316&type=booster
        setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
        logHHAuto("Equip "+booster.name+", setting autoloop to false");
        const params = {
            action: "market_equip_booster",
            id_item: booster.id_item,
            type: "booster"
        };

        return Promise.resolve(false);
/*
        return new Promise((resolve) => {
            unsafeWindow.hh_ajax(params, function(data) {
                if (data.success) logHHAuto('Booster equipped');
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                setTimeout(autoLoop,randomInterval(500,800));
                resolve(true);
            }, function (err){
                logHHAuto('Error occured booster not equipped, could be booster is already equipped');
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                setTimeout(autoLoop,randomInterval(500,800));
                resolve(false);
            });
        });
*/
    }
}