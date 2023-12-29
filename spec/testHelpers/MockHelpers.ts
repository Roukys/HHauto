export class MockHelper{

    static mockDomain(domain: string = 'www.hentaiheroes.com', page: string = '', search:string = '') {
        if(search != '' && search.indexOf('?') < 0) {
            search = '?' + search;
        } 
        if (page != '' && page.indexOf('/') < 0) {
            page = '/' + page;
        } 
        Object.defineProperty(window, 'location', {
            get() {
                return { 
                    hostname: domain,
                    href: 'https://' + domain + page + search,
                    origin: 'https://' + domain,
                    pathname: page,
                    search: search
                };
            },
        });
    }

    static mockHeroLevel(heroLevel: number) {
        unsafeWindow.Hero = {
            name: "TOTO",
            infos: {
                level: heroLevel
            }
        };
    }
}