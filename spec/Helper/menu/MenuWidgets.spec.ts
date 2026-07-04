import { setMenuPorts } from '../../../src/Helper/menu/MenuPorts';
import {
    hhButton,
    hhMenuInput,
    hhMenuInputWithImg,
    hhMenuSelect,
    hhMenuSwitch,
    hhMenuSwitchWithImg,
} from '../../../src/Helper/menu/MenuWidgets';
import { buildTestPorts } from './menuTestPorts';

describe('MenuWidgets', () => {
    beforeEach(() => {
        setMenuPorts(buildTestPorts({
            getTextForUI: (id: string, type: string) => `${id}:${type}`,
            getHHScriptVars: (id: string) => (id === 'baseImgPath' ? 'https://img.example' : ''),
        }));
    });

    const parse = (html: string): HTMLElement => {
        const container = document.createElement('div');
        container.innerHTML = html;
        expect(container.children).toHaveLength(1);
        return container.firstElementChild as HTMLElement;
    };

    describe('hhButton', () => {
        it('renders a tooltip wrapper with a labelled button', () => {
            const el = parse(hhButton('gitHub', 'git'));
            expect(el.className).toBe('tooltipHH');
            expect(el.querySelector('span.tooltipHHtext')!.textContent).toBe('gitHub:tooltip');
            const label = el.querySelector('label.myButton') as HTMLLabelElement;
            expect(label.id).toBe('git');
            expect(label.textContent).toBe('gitHub:elementText');
        });

        it('applies optional main and label styles', () => {
            const el = parse(hhButton('gitHub', 'git', 'color:red', 'width:10px'));
            expect(el.getAttribute('style')).toBe('color:red');
            expect(el.querySelector('label')!.getAttribute('style')).toBe('width:10px');
        });
    });

    describe('hhMenuSwitch', () => {
        it('renders a checkbox switch with name and tooltip', () => {
            const el = parse(hhMenuSwitch('master'));
            expect(el.className).toBe('labelAndButton');
            expect(el.id).toBe('');
            expect(el.querySelector('span.HHMenuItemName')!.textContent).toBe('master:elementText');
            const input = el.querySelector('input') as HTMLInputElement;
            expect(input.id).toBe('master');
            expect(input.type).toBe('checkbox');
            const slider = el.querySelector('span.slider') as HTMLSpanElement;
            expect(slider.classList.contains('kobans')).toBe(false);
            expect(slider.classList.contains('styling')).toBe(false);
        });

        it('supports enabling div id, koban and styling flags', () => {
            const el = parse(hhMenuSwitch('autoSeason', 'isEnabledSeason', true, true));
            expect(el.id).toBe('isEnabledSeason');
            const slider = el.querySelector('span.slider') as HTMLSpanElement;
            expect(slider.classList.contains('kobans')).toBe(true);
            expect(slider.classList.contains('styling')).toBe(true);
        });
    });

    describe('hhMenuSwitchWithImg', () => {
        it('prefixes the image with baseImgPath and renders the switch', () => {
            const el = parse(hhMenuSwitchWithImg('spendKobans0', 'design/menu/affil_prog.svg', true));
            const img = el.querySelector('img.iconImg') as HTMLImageElement;
            expect(img.getAttribute('src')).toBe('https://img.example/design/menu/affil_prog.svg');
            const input = el.querySelector('input') as HTMLInputElement;
            expect(input.id).toBe('spendKobans0');
            expect(el.querySelector('span.slider')!.classList.contains('kobans')).toBe(true);
        });
    });

    describe('hhMenuSelect', () => {
        it('renders an empty select with style', () => {
            const el = parse(hhMenuSelect('autoTrollSelector', 'width:60px;'));
            const select = el.querySelector('select') as HTMLSelectElement;
            expect(select.id).toBe('autoTrollSelector');
            expect(select.getAttribute('style')).toBe('width:60px;');
            expect(select.options).toHaveLength(0);
        });

        it('injects pre-built option markup', () => {
            const el = parse(hhMenuSelect('sel', '', '<option value="1">one</option>'));
            const select = el.querySelector('select') as HTMLSelectElement;
            expect(select.options).toHaveLength(1);
            expect(select.options[0].value).toBe('1');
        });
    });

    describe('hhMenuInput', () => {
        it('renders a required patterned text input', () => {
            const el = parse(hhMenuInput('kobanBank', '[0-9]*', 'width:50px', 'moneyClass', 'numeric'));
            const input = el.querySelector('input') as HTMLInputElement;
            expect(input.id).toBe('kobanBank');
            expect(input.required).toBe(true);
            expect(input.pattern).toBe('[0-9]*');
            expect(input.type).toBe('text');
            expect(input.className).toBe('moneyClass');
            expect(input.getAttribute('inputMode')).toBe('numeric');
        });

        it('defaults inputMode to text', () => {
            const el = parse(hhMenuInput('x', '.*'));
            expect(el.querySelector('input')!.getAttribute('inputMode')).toBe('text');
        });
    });

    describe('hhMenuInputWithImg', () => {
        it('uses a root-absolute src for paths containing images/', () => {
            const el = parse(hhMenuInputWithImg('t', '.*', '', 'images/penta_drill/penta_drill.png'));
            expect(el.querySelector('img')!.getAttribute('src')).toBe('/images/penta_drill/penta_drill.png');
        });

        it('prefixes other paths with baseImgPath', () => {
            const el = parse(hhMenuInputWithImg('t', '.*', '', 'pictures/design/ic_kiss.png'));
            expect(el.querySelector('img')!.getAttribute('src')).toBe('https://img.example/pictures/design/ic_kiss.png');
        });
    });
});
