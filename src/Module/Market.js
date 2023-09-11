import {
    getHHVars,
    getHero,
    getStoredValue,
    randomInterval,
    setStoredValue
} from "../Helper";
import { isJSON, logHHAuto } from "../Utils";

export class Market {
    static doShopping() {
        try
        {
            //logHHAuto("Go shopping");
            const Hero=getHero();
            var MS='carac'+getHHVars('Hero.infos.class');
            var SS1='carac'+(getHHVars('Hero.infos.class')%3+1);
            var SS2='carac'+((getHHVars('Hero.infos.class')+1)%3+1);
            var money=getHHVars('Hero.currencies.soft_currency');
            var kobans=getHHVars('Hero.currencies.hard_currency');


            if (getStoredValue("HHAuto_Temp_storeContents") === undefined )
            {
                if (! isJSON(getStoredValue("HHAuto_Temp_storeContents")) )
                {
                    logHHAuto("Catched error : Could not parse store content.");
                }
                setStoredValue("HHAuto_Temp_charLevel",0);
                return;
            }

            if (getStoredValue("HHAuto_Temp_haveAff") === undefined || getStoredValue("HHAuto_Temp_haveExp") === undefined)
            {
                setStoredValue("HHAuto_Temp_charLevel", 0);
                return;
            }
            var shop=JSON.parse(getStoredValue("HHAuto_Temp_storeContents"));

            var Exp=Number(getStoredValue("HHAuto_Setting_autoExp"));
            var Aff=Number(getStoredValue("HHAuto_Setting_autoAff"));
            var MaxAff=Number(getStoredValue("HHAuto_Setting_maxAff"));
            var MaxExp=Number(getStoredValue("HHAuto_Setting_maxExp"));
            var HaveAff=Number(getStoredValue("HHAuto_Temp_haveAff"));
            var HaveExp=Number(getStoredValue("HHAuto_Temp_haveExp"));
            var HaveBooster=JSON.parse(getStoredValue("HHAuto_Temp_haveBooster"));
            var MaxBooster=Number(getStoredValue("HHAuto_Setting_maxBooster"));
            let Was;

            var boosterFilter = getStoredValue("HHAuto_Setting_autoBuyBoostersFilter").split(";");
            if (getStoredValue("HHAuto_Setting_autoBuyBoosters") ==="true" && boosterFilter.length > 0)
            {
                Was=shop[1].length;

                for (var boost of boosterFilter)
                {
                    const boosterOwned = HaveBooster.hasOwnProperty(boost) ? Number(HaveBooster[boost]) : 0;
                    for (var n1=shop[1].length-1;n1>=0;n1--)
                    {
                        if (kobans>=Number(getStoredValue("HHAuto_Setting_kobanBank"))+Number(shop[1][n1].price_buy) && shop[1][n1].item.currency == "hc" && shop[1][n1].item.identifier == boost && (shop[1][n1].item.rarity=='legendary' || shop[1][n1].item.rarity=='mythic') && boosterOwned < MaxBooster)
                        {
                            logHHAuto({log:'wanna buy ',object:shop[1][n1],owning: boosterOwned});
                            if (kobans>=Number(shop[1][n1].price_buy))
                            {
                                logHHAuto({log:'Buying : ',object:shop[1][n1]});
                                // change referer
                                window.history.replaceState(null, '', '/shop.html');
                                kobans-=Number(shop[1][n1].price_buy);
                                var params1 = {
                                    index: shop[1][n1].index,
                                    action: "market_buy",
                                    id_item: shop[1][n1].id_item,
                                    type: "booster"
                                };
                                hh_ajax(params1, function(data) {
                                    Hero.updates(data.changes, false);
                                    if (data.success === false)
                                    {
                                        clearTimer('nextShopTime');
                                    } else {
                                        HaveBooster[boost] = boosterOwned++;
                                        setStoredValue("HHAuto_Temp_haveBooster", JSON.stringify(HaveBooster));
                                    }
                                    // change referer
                                    window.history.replaceState(null, '', '/home.html');
                                });
                                shop[1].splice(n1,1);
                                setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                                setTimeout(doShopping, randomInterval(600,1200));
                                return;
                            }
                        }
                    }
                }

                if (shop[1].length==0 && Was>0)
                {
                    setStoredValue("HHAuto_Temp_charLevel", 0);
                }
            }

            if (getStoredValue("HHAuto_Setting_autoAffW") ==="true" && HaveAff<MaxAff)
            {
                //logHHAuto('gifts');
                Was=shop[2].length;
                var allGiftsPriceSc = 0;
                for (var n2=shop[2].length-1;n2>=0;n2--)
                {
                    if (shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                    {
                        allGiftsPriceSc += Number(shop[2][n2].price_buy);
                    }
                }
                if (allGiftsPriceSc>0 && money>=Exp+allGiftsPriceSc) {
                    logHHAuto('Buy all gifts for price:' + allGiftsPriceSc);
                    // change referer
                    window.history.replaceState(null, '', '/shop.html');
                    money-=allGiftsPriceSc;
                    var params2 = {
                        action: "market_auto_buy",
                        type: "gift"
                    };
                    hh_ajax(params2, function(data) {
                        Hero.updates(data.changes, false);
                        if (data.success === false)
                        {
                            clearTimer('nextShopTime');
                        }
                        // change referer
                        window.history.replaceState(null, '', '/home.html');
                    });
                    for (var n2=shop[2].length-1;n2>=0;n2--)
                    {
                        if (shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            shop[2].splice(n2,1);
                        }
                    }
                    setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                } else {
                    for (var n2=shop[2].length-1;n2>=0;n2--)
                    {
                        //logHHAuto({log:'wanna buy ',Object:shop[2][n2]});
                        if (money>=Aff+Number(shop[2][n2].price_buy) && money>=Number(shop[2][n2].price_buy) && shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            logHHAuto({log:'Buying : ',Object:shop[2][n2]});
                            // change referer
                            window.history.replaceState(null, '', '/shop.html');
                            money-=Number(shop[2][n2].price_buy);
                            var params2 = {
                                index: shop[2][n2].index,
                                action: "market_buy",
                                id_item: shop[2][n2].id_item,
                                type: "gift"
                            };
                            hh_ajax(params2, function(data) {
                                Hero.updates(data.changes, false);
                                if (data.success === false)
                                {
                                    clearTimer('nextShopTime');
                                }
                                // change referer
                                window.history.replaceState(null, '', '/home.html');
                            });
                            shop[2].splice(n2,1);
                            setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                            setTimeout(doShopping, randomInterval(600,1200));
                            return;
                        }
                    }
                }
                if (shop[2].length==0 && Was>0)
                {
                    setStoredValue("HHAuto_Temp_charLevel", 0);
                }
            }
            if (getStoredValue("HHAuto_Setting_autoExpW") ==="true" && HaveExp<MaxExp)
            {
                //logHHAuto('books');
                Was=shop[3].length;
                var allPotionPriceSc = 0;
                for (var n3=shop[3].length-1;n3>=0;n3--)
                {
                    if (shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                    {
                        allPotionPriceSc += Number(shop[3][n3].price_buy);
                    }
                }
                if (allPotionPriceSc>0 && money>=Exp+allPotionPriceSc) {
                    logHHAuto('Buy all books for price:' + allPotionPriceSc);
                    // change referer
                    window.history.replaceState(null, '', '/shop.html');
                    money-=allPotionPriceSc;
                    var params3 = {
                        action: "market_auto_buy",
                        type: "potion"
                    };
                    hh_ajax(params3, function(data) {
                        Hero.updates(data.changes, false);
                        if (data.success === false)
                        {
                            clearTimer('nextShopTime');
                        }
                        // change referer
                        window.history.replaceState(null, '', '/home.html');
                    });
                    for (var n3=shop[3].length-1;n3>=0;n3--)
                    {
                        if (shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            shop[3].splice(n3,1);
                        }
                    }
                    setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                } else {
                    for (var n3=shop[3].length-1;n3>=0;n3--)
                    {
                        //logHHAuto('wanna buy ',shop[3][n3]);
                        if (money>=Exp+Number(shop[3][n3].price_buy) && money>=Number(shop[3][n3].price_buy) && shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            logHHAuto({log:'Buying : ',Object:shop[3][n3]});
                            // change referer
                            window.history.replaceState(null, '', '/shop.html');
                            money-=Number(shop[3][n3].price);
                            var params3 = {
                                index: shop[3][n3].index,
                                action: "market_buy",
                                id_item: shop[3][n3].id_item,
                                type: "potion"
                            };
                            hh_ajax(params3, function(data) {
                                Hero.updates(data.changes, false);
                                if (data.success === false)
                                {
                                    clearTimer('nextShopTime');
                                }
                                // change referer
                                window.history.replaceState(null, '', '/home.html');
                            });
                            shop[3].splice(n3,1);
                            setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                            setTimeout(doShopping, randomInterval(600,1200));
                            return;
                        }
                    }
                }
                if (shop[3].length==0 && Was>0)
                {
                    setStoredValue("HHAuto_Temp_charLevel", 0);
                }
            }
            setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
            //unsafeWindow.Hero.currencies.soft_currency=money;
            //Hero.update("soft_currency", money, false);
        }
        catch (ex)
        {
            logHHAuto("Catched error : Could not buy : "+ex);
            setStoredValue("HHAuto_Temp_charLevel", 0);
        }
    }
}