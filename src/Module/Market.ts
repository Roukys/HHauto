import {
    HeroHelper,
    clearTimer,
    getHHVars,
    getHero,
    getStoredValue,
    randomInterval,
    setStoredValue
} from '../Helper/index';
import { addNutakuSession } from '../Service/PageNavigationService';
import { getHHAjax, isJSON, logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';

export class Market {
    static doShopping() {
        try
        {
            //logHHAuto("Go shopping");
            const Hero=getHero();
            var MS = 'carac' + HeroHelper.getClass();
            var SS1 = 'carac' + (HeroHelper.getClass() % 3 + 1);
            var SS2 = 'carac' + ((HeroHelper.getClass() + 1) % 3 + 1);
            var money = HeroHelper.getMoney();
            var kobans = HeroHelper.getKoban();


            if (getStoredValue(HHStoredVarPrefixKey+"Temp_storeContents") === undefined )
            {
                if (! isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_storeContents")) )
                {
                    logHHAuto("Catched error : Could not parse store content.");
                }
                setStoredValue(HHStoredVarPrefixKey+"Temp_charLevel",0);
                return;
            }

            if (getStoredValue(HHStoredVarPrefixKey+"Temp_haveAff") === undefined || getStoredValue(HHStoredVarPrefixKey+"Temp_haveExp") === undefined)
            {
                setStoredValue(HHStoredVarPrefixKey+"Temp_charLevel", 0);
                return;
            }
            var shop=JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_storeContents"));

            var Exp=Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoExp"));
            var Aff=Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoAff"));
            var MaxAff=Number(getStoredValue(HHStoredVarPrefixKey+"Setting_maxAff"));
            var MaxExp=Number(getStoredValue(HHStoredVarPrefixKey+"Setting_maxExp"));
            var HaveAff=Number(getStoredValue(HHStoredVarPrefixKey+"Temp_haveAff"));
            var HaveExp=Number(getStoredValue(HHStoredVarPrefixKey+"Temp_haveExp"));
            var HaveBooster=JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_haveBooster"));
            var MaxBooster=Number(getStoredValue(HHStoredVarPrefixKey+"Setting_maxBooster"));
            let Was;

            var boosterFilter = getStoredValue(HHStoredVarPrefixKey+"Setting_autoBuyBoostersFilter").split(";");
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoBuyBoosters") ==="true" && boosterFilter.length > 0)
            {
                Was=shop[1].length;

                for (var boost of boosterFilter)
                {
                    let boosterOwned = HaveBooster.hasOwnProperty(boost) ? Number(HaveBooster[boost]) : 0;
                    for (var n1=shop[1].length-1;n1>=0;n1--)
                    {
                        if (kobans>=Number(getStoredValue(HHStoredVarPrefixKey+"Setting_kobanBank"))+Number(shop[1][n1].price_buy) && shop[1][n1].item.currency == "hc" && shop[1][n1].item.identifier == boost && (shop[1][n1].item.rarity=='legendary' || shop[1][n1].item.rarity=='mythic') && boosterOwned < MaxBooster)
                        {
                            logHHAuto({log:'wanna buy ',object:shop[1][n1],owning: boosterOwned});
                            if (kobans>=Number(shop[1][n1].price_buy))
                            {
                                logHHAuto({log:'Buying : ',object:shop[1][n1]});
                                // change referer
                                window.history.replaceState(null, '', addNutakuSession('/shop.html') as string);
                                kobans-=Number(shop[1][n1].price_buy);
                                var params1 = {
                                    index: shop[1][n1].index,
                                    action: "market_buy",
                                    id_item: shop[1][n1].id_item,
                                    type: "booster"
                                };
                                getHHAjax()(params1, function(data:any) {
                                    Hero.updates(data.changes, false);
                                    if (data.success === false)
                                    {
                                        clearTimer('nextShopTime');
                                    } else {
                                        HaveBooster[boost] = (boosterOwned+1);
                                        setStoredValue(HHStoredVarPrefixKey+"Temp_haveBooster", JSON.stringify(HaveBooster));
                                    }
                                    // change referer
                                    window.history.replaceState(null, '', addNutakuSession('/home.html') as string);
                                });
                                shop[1].splice(n1,1);
                                setStoredValue(HHStoredVarPrefixKey+"Temp_storeContents", JSON.stringify(shop));
                                setTimeout(Market.doShopping, randomInterval(600,1200));
                                return;
                            }
                        }
                    }
                }

                if (shop[1].length==0 && Was>0)
                {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_charLevel", 0);
                }
            }

            if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoAffW") ==="true" && HaveAff<MaxAff)
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
                    window.history.replaceState(null, '', addNutakuSession('/shop.html') as string);
                    money-=allGiftsPriceSc;
                    var params2 = {
                        action: "market_auto_buy",
                        type: "gift"
                    };
                    getHHAjax()(params2, function(data) {
                        Hero.updates(data.changes, false);
                        if (data.success === false)
                        {
                            clearTimer('nextShopTime');
                        }
                        // change referer
                        window.history.replaceState(null, '', addNutakuSession('/home.html') as string);
                    });
                    for (var n2=shop[2].length-1;n2>=0;n2--)
                    {
                        if (shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            shop[2].splice(n2,1);
                        }
                    }
                    setStoredValue(HHStoredVarPrefixKey+"Temp_storeContents", JSON.stringify(shop));
                } else {
                    for (var n2=shop[2].length-1;n2>=0;n2--)
                    {
                        //logHHAuto({log:'wanna buy ',Object:shop[2][n2]});
                        if (money>=Aff+Number(shop[2][n2].price_buy) && money>=Number(shop[2][n2].price_buy) && shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            logHHAuto({log:'Buying : ',Object:shop[2][n2]});
                            // change referer
                            window.history.replaceState(null, '', addNutakuSession('/shop.html') as string);
                            money-=Number(shop[2][n2].price_buy);
                            var params4 = {
                                index: shop[2][n2].index,
                                action: "market_buy",
                                id_item: shop[2][n2].id_item,
                                type: "gift"
                            };
                            getHHAjax()(params4, function(data) {
                                Hero.updates(data.changes, false);
                                if (data.success === false)
                                {
                                    clearTimer('nextShopTime');
                                }
                                // change referer
                                window.history.replaceState(null, '', addNutakuSession('/home.html') as string);
                            });
                            shop[2].splice(n2,1);
                            setStoredValue(HHStoredVarPrefixKey+"Temp_storeContents", JSON.stringify(shop));
                            setTimeout(Market.doShopping, randomInterval(600,1200));
                            return;
                        }
                    }
                }
                if (shop[2].length==0 && Was>0)
                {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_charLevel", 0);
                }
            }
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoExpW") ==="true" && HaveExp<MaxExp)
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
                    window.history.replaceState(null, '', addNutakuSession('/shop.html') as string);
                    money-=allPotionPriceSc;
                    var params3 = {
                        action: "market_auto_buy",
                        type: "potion"
                    };
                    getHHAjax()(params3, function(data) {
                        Hero.updates(data.changes, false);
                        if (data.success === false)
                        {
                            clearTimer('nextShopTime');
                        }
                        // change referer
                        window.history.replaceState(null, '', addNutakuSession('/home.html') as string);
                    });
                    for (var n3=shop[3].length-1;n3>=0;n3--)
                    {
                        if (shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            shop[3].splice(n3,1);
                        }
                    }
                    setStoredValue(HHStoredVarPrefixKey+"Temp_storeContents", JSON.stringify(shop));
                } else {
                    for (var n3=shop[3].length-1;n3>=0;n3--)
                    {
                        //logHHAuto('wanna buy ',shop[3][n3]);
                        if (money>=Exp+Number(shop[3][n3].price_buy) && money>=Number(shop[3][n3].price_buy) && shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            logHHAuto({log:'Buying : ',Object:shop[3][n3]});
                            // change referer
                            window.history.replaceState(null, '', addNutakuSession('/shop.html') as string);
                            money-=Number(shop[3][n3].price);
                            var params5 = {
                                index: shop[3][n3].index,
                                action: "market_buy",
                                id_item: shop[3][n3].id_item,
                                type: "potion"
                            };
                            getHHAjax()(params5, function(data) {
                                Hero.updates(data.changes, false);
                                if (data.success === false)
                                {
                                    clearTimer('nextShopTime');
                                }
                                // change referer
                                window.history.replaceState(null, '', addNutakuSession('/home.html') as string);
                            });
                            shop[3].splice(n3,1);
                            setStoredValue(HHStoredVarPrefixKey+"Temp_storeContents", JSON.stringify(shop));
                            setTimeout(Market.doShopping, randomInterval(600,1200));
                            return;
                        }
                    }
                }
                if (shop[3].length==0 && Was>0)
                {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_charLevel", 0);
                }
            }
            setStoredValue(HHStoredVarPrefixKey+"Temp_storeContents", JSON.stringify(shop));
            //unsafeWindow.Hero.currencies.soft_currency=money;
            //Hero.update("soft_currency", money, false);
        }
        catch (ex)
        {
            logHHAuto("Catched error : Could not buy : "+ex);
            setStoredValue(HHStoredVarPrefixKey+"Temp_charLevel", 0);
        }
    }
}