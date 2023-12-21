import { NumberHelper } from "./NumberHelper";

export function parsePrice(princeStr:string):number {
    // Parse price to number 105K to 105000, 6.38M to 6380000
    // Replace comma by dots for local supports
    let ret = Number.NaN;
    if(princeStr && princeStr.indexOf('B')>0) {
        ret = Number(princeStr.replace(/B/g, '').replace(',', '.')) * 1000000000;
    } else if(princeStr && princeStr.indexOf('M')>0) {
        ret = Number(princeStr.replace(/M/g, '').replace(',', '.')) * 1000000;
    } else if(princeStr && princeStr.indexOf('K')>0) {
        ret = Number(princeStr.replace(/K/g, '').replace(',', '.')) * 1000;
    } else {
        ret = NumberHelper.remove1000sSeparator(princeStr);
    }
    return ret;
}
/*
export function manageUnits(inText)
{
    let units = ["firstUnit", "K", "M", "B"];
    let textUnit= "";
    for (let currUnit of units)
    {
        if (inText.includes(currUnit))
        {
            textUnit= currUnit;
        }
    }
    if (textUnit !== "")
    {
        let integerPart;
        let decimalPart;
        if (inText.includes('.') )
        {
            inText = inText.replace(/[^0-9\.]/gi, '');
            integerPart = inText.split('.')[0];
            decimalPart = inText.split('.')[1];

        }
        else if (inText.includes(','))
        {
            inText = inText.replace(/[^0-9,]/gi, '');
            integerPart = inText.split(',')[0];
            decimalPart = inText.split(',')[1];
        }
        else
        {
            integerPart = inText.replace(/[^0-9]/gi, '');
            decimalPart = "0";
        }
        //console.log(integerPart,decimalPart);
        let decimalNumber = Number(integerPart)
        if (Number(decimalPart) !== 0)
        {
            decimalNumber+= Number(decimalPart)/(10**decimalPart.length)
        }
        return decimalNumber*(1000**units.indexOf(textUnit));
    }
    else
    {
        return parseInt(inText.replace(/[^0-9]/gi, ''));
    }
}
*/