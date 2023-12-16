export function getBrowserData(nav: Navigator) {
    let name:string, version;

    var ua = nav.userAgent;
    var browserMatch = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
    if (browserMatch[1]) { browserMatch[1] = browserMatch[1].toLowerCase(); }
    var operaMatch;
    if (browserMatch[1] === 'chrome') { operaMatch = ua.match(/\bOPR\/([\d\.]+)/); }

    if (/trident/i.test(browserMatch[1])) {
        var msieMatch = /\brv[ :]+([\d\.]+)/g.exec(ua) || [];
        name = 'msie';
        version = msieMatch[1];
    }
    else if (operaMatch) {
        name = 'opera';
        version = operaMatch[1];
    }
    else if (browserMatch[1] === 'safari') {
        var safariVersionMatch = ua.match(/version\/([\d\.]+)/i);
        name = 'safari';
        version = safariVersionMatch[1];
    }
    else {
        name = browserMatch[1];
        version = browserMatch[2];
    }

    var versionParts = [];
    if (version) {
        var versionPartsMatch = version.match(/(\d+)/g) || [];
        for (var i=0; i < versionPartsMatch.length; i++) {
            versionParts.push(versionPartsMatch[i]);
        }
        //if (versionParts.length > 0) { data.majorVersion = versionParts[0]; }
    }
    name = name || '(unknown browser name)';
    version = {
        full: version || '(unknown full browser version)',
        parts: versionParts,
        major: versionParts.length > 0 ? versionParts[0] : '(unknown major browser version)'
    };

    return name + ' ' + version['full'];
};