export class MockHelper{

    static mockDomain(domain: string = 'www.hentaiheroes.com') {
        Object.defineProperty(window, 'location', {
            get() {
                return { 
                    hostname: domain,
                    origin: 'https://' + domain 
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