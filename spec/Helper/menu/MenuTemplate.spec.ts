import { setMenuPorts } from '../../../src/Helper/menu/MenuPorts';
import { getMenu } from '../../../src/Helper/menu/MenuTemplate';
import { buildLeftColumn } from '../../../src/Helper/menu/MenuColumnLeft';
import { buildMiddleColumn } from '../../../src/Helper/menu/MenuColumnMiddle';
import { buildRightColumn } from '../../../src/Helper/menu/MenuColumnRight';
import { buildTestPorts } from './menuTestPorts';

describe('MenuTemplate', () => {
    let storedValues: Record<string, string>;

    beforeEach(() => {
        // setup-jest.js provides `global.GM = {}`; give it the shape
        // MenuColumnLeft reads (GM.info.script.version).
        (global as { GM?: unknown }).GM = { info: { script: { version: '0.0.0-test' } } };
        storedValues = {};
        setMenuPorts(buildTestPorts({
            getTextForUI: (id: string, type: string) => `${id}:${type}`,
            getHHScriptVars: (id: string) => (id === 'baseImgPath' ? 'https://img.example' : ''),
            getStoredValue: (name: string) => storedValues[name] ?? null,
            storedVarPrefix: 'HHAuto_',
        }));
    });

    const parse = (html: string): HTMLElement => {
        const container = document.createElement('div');
        container.innerHTML = html;
        expect(container.children).toHaveLength(1);
        return container.firstElementChild as HTMLElement;
    };

    describe('getMenu', () => {
        it('assembles the hidden #sMenu panel from all three columns', () => {
            const menu = parse(getMenu());
            expect(menu.id).toBe('sMenu');
            expect(menu.className).toBe('HHAutoScriptMenu');
            expect((menu as HTMLElement).style.display).toBe('none');
            // One representative element per column proves all columns are present.
            expect(menu.querySelector('#master')).not.toBeNull();          // left
            expect(menu.querySelector('#autoTrollSelector')).not.toBeNull(); // middle
            expect(menu.querySelector('#autoStats')).not.toBeNull();       // right
            expect(menu.textContent).toContain('0.0.0-test');
        });

        it('produces parse-stable markup (no dangling elements)', () => {
            const menu = parse(getMenu());
            // Every input must have a unique id: duplicates would break get/setMenuValues.
            const ids = Array.from(menu.querySelectorAll('input, select')).map((el) => el.id);
            expect(new Set(ids).size).toBe(ids.length);
        });

        it('hides survey-hidden rows unless debug is enabled', () => {
            const hidden = parse(getMenu());
            expect(hidden.querySelector('#useX10Fights')!.closest('div[style*="display:none"]'))
                .not.toBeNull();

            storedValues['HHAuto_' + 'Temp_Debug'] = 'true'; // TK.Debug
            const debug = parse(getMenu());
            expect(debug.querySelector('#useX10Fights')!.closest('div[style*="display:none"]'))
                .toBeNull();
        });
    });

    describe('column builders', () => {
        it('buildLeftColumn contains the global, koban and display boxes', () => {
            const col = parse(buildLeftColumn());
            expect(col.querySelector('#master')).not.toBeNull();
            expect(col.querySelector('#kobanBank')).not.toBeNull();
            expect(col.querySelector('#showRewardsRecap')).not.toBeNull();
            expect(col.querySelector('#isEnabledPoV')).not.toBeNull();
        });

        it('buildMiddleColumn gates debug-only rows on its parameter', () => {
            const noDebug = parse(buildMiddleColumn(false));
            expect(noDebug.innerHTML).toContain('display:none');
            const withDebug = parse(buildMiddleColumn(true));
            const x10 = withDebug.querySelector('#useX10Fights')!.closest('div[style*="display:none"]');
            expect(x10).toBeNull();
            expect(withDebug.querySelector('#autoLeaguesSelector')).not.toBeNull();
        });

        it('buildRightColumn contains champions, pantheon, shop and events', () => {
            const col = parse(buildRightColumn());
            expect(col.querySelector('#isEnabledAllChamps')).not.toBeNull();
            expect(col.querySelector('#autoPantheon')).not.toBeNull();
            expect(col.querySelector('#isEnabledShop')).not.toBeNull();
            expect(col.querySelector('#isEnabledEvents')).not.toBeNull();
        });
    });
});
