export function add1000sSeparator1()
{
    var nToFormat = this.value;
    this.value = add1000sSeparator(nToFormat);
}

export function add1000sSeparator(nToFormat)
{
    return nThousand(remove1000sSeparator(nToFormat));
}

export function remove1000sSeparator(nToFormat)
{
    return Number(nToFormat.replace(/\D/g, ''));
}

export function nThousand(x) {
    if (typeof x != 'number') {
        x = 0;
    }
    return x.toLocaleString();
}

// Numbers: rounding to K, M, G and T
export function nRounding(num, digits, updown) {
    var power = [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: 'K' },
        { value: 1E6, symbol: 'M' },
        { value: 1E9, symbol: 'B' },
        { value: 1E12, symbol: 'T' },
    ];
    var i;
    for (i = power.length - 1; i > 0; i--) {
        if (num >= power[i].value) {
            break;
        }
    }
    if (updown == 1) {
        return (Math.ceil(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
    else if (updown == 0) {
        return (Math.round(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
    else if (updown == -1) {
        return (Math.floor(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
}