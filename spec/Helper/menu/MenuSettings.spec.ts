import { setMenuPorts, MenuStoredVarEntry } from '../../../src/Helper/menu/MenuPorts';
import {
    addEventsOnMenuItems,
    getMenuValues,
    preventKobanUsingSwitchUnauthorized,
    setMenuValues,
} from '../../../src/Helper/menu/MenuSettings';
import { buildTestPorts } from './menuTestPorts';

const PREFIX = 'HHAuto_';

describe('MenuSettings', () => {
    let thousandsSeparator: string;
    let storage: Record<string, string>;
    let setDefaults: jest.Mock;
    let setStoredValue: jest.Mock;
    let logHHAuto: jest.Mock;
    let popupState: string | boolean;
    let storedVars: Record<string, MenuStoredVarEntry>;

    const wirePorts = () => {
        setMenuPorts(buildTestPorts({
            getStorageItem: () => storage as unknown as Storage,
            HHStoredVars: storedVars,
            storedVarPrefix: PREFIX,
            setDefaults,
            setStoredValue,
            logHHAuto,
            isDisplayedHHPopUp: () => popupState,
        }));
    };

    beforeAll(() => {
        thousandsSeparator = (11111).toLocaleString().replace(/1+/g, '');
    });

    beforeEach(() => {
        document.body.innerHTML = '';
        storage = {};
        storedVars = {};
        setDefaults = jest.fn();
        setStoredValue = jest.fn();
        logHHAuto = jest.fn();
        popupState = false;
        wirePorts();
    });

    const addMenuHtml = (inner: string) => {
        document.body.innerHTML = `<div id="sMenu">${inner}</div>`;
    };

    describe('setMenuValues', () => {
        it('does nothing when the menu is not in the DOM', () => {
            setMenuValues();
            expect(setDefaults).not.toHaveBeenCalled();
        });

        it('writes a Boolean stored value onto a checkbox', () => {
            storedVars[PREFIX + 'Setting_myToggle'] = {
                storage: 'localStorage', HHType: 'Setting', setMenu: true,
                valueType: 'Boolean', menuType: 'checked',
            };
            storage[PREFIX + 'Setting_myToggle'] = 'true';
            addMenuHtml('<input id="myToggle" type="checkbox">');
            wirePorts();

            setMenuValues();
            expect((document.getElementById('myToggle') as HTMLInputElement).checked).toBe(true);
            expect(setDefaults).toHaveBeenCalledTimes(1);
        });

        it('formats a Long Integer stored value into the input', () => {
            storedVars[PREFIX + 'Setting_bank'] = {
                storage: 'localStorage', HHType: 'Setting', setMenu: true,
                valueType: 'Long Integer', menuType: 'value',
            };
            storage[PREFIX + 'Setting_bank'] = '12345';
            addMenuHtml('<input id="bank" type="text">');
            wirePorts();

            setMenuValues();
            expect((document.getElementById('bank') as HTMLInputElement).value)
                .toBe('12' + thousandsSeparator + '345');
        });

        it('honours customMenuID and logs entries without storage/type', () => {
            storedVars[PREFIX + 'Setting_custom'] = {
                storage: 'localStorage', HHType: 'Setting', setMenu: true,
                valueType: 'String', menuType: 'value', customMenuID: 'customField',
            };
            storage[PREFIX + 'Setting_custom'] = 'abc';
            storedVars['brokenEntry'] = {};
            addMenuHtml('<input id="customField" type="text">');
            wirePorts();

            setMenuValues();
            expect((document.getElementById('customField') as HTMLInputElement).value).toBe('abc');
            expect(logHHAuto).toHaveBeenCalledWith('HHStoredVar brokenEntry has no storage or type defined.');
        });
    });

    describe('getMenuValues', () => {
        it('is skipped while the loadConfig popup is displayed', () => {
            addMenuHtml('');
            popupState = 'loadConfig';
            wirePorts();
            getMenuValues();
            expect(setDefaults).not.toHaveBeenCalled();
        });

        it('reads a Long Integer input back into storage without separators', () => {
            storedVars[PREFIX + 'Setting_bank'] = {
                storage: 'localStorage', HHType: 'Setting', getMenu: true,
                valueType: 'Long Integer', menuType: 'value',
            };
            storage[PREFIX + 'Setting_bank'] = '1';
            addMenuHtml('<input id="bank" type="text">');
            (document.getElementById('bank') as HTMLInputElement).value = '12' + thousandsSeparator + '345';
            wirePorts();

            getMenuValues();
            expect(storage[PREFIX + 'Setting_bank']).toBe('12345');
            expect(setDefaults).toHaveBeenCalledTimes(1);
        });

        it('invokes newValueFunction only when the value changed', () => {
            const changed = jest.fn();
            const unchanged = jest.fn();
            storedVars[PREFIX + 'Setting_a'] = {
                storage: 'localStorage', HHType: 'Setting', getMenu: true,
                valueType: 'String', menuType: 'value', newValueFunction: { apply: changed },
            };
            storedVars[PREFIX + 'Setting_b'] = {
                storage: 'localStorage', HHType: 'Setting', getMenu: true,
                valueType: 'String', menuType: 'value', newValueFunction: { apply: unchanged },
            };
            storage[PREFIX + 'Setting_a'] = 'old';
            storage[PREFIX + 'Setting_b'] = 'same';
            addMenuHtml('<input id="a" type="text"><input id="b" type="text">');
            (document.getElementById('a') as HTMLInputElement).value = 'new';
            (document.getElementById('b') as HTMLInputElement).value = 'same';
            wirePorts();

            getMenuValues();
            expect(storage[PREFIX + 'Setting_a']).toBe('new');
            expect(changed).toHaveBeenCalledTimes(1);
            expect(unchanged).not.toHaveBeenCalled();
        });
    });

    describe('preventKobanUsingSwitchUnauthorized', () => {
        beforeEach(() => { jest.useFakeTimers(); });
        afterEach(() => { jest.useRealTimers(); });

        it('reverts the switch when koban spending is not allowed', () => {
            document.body.innerHTML =
                '<input id="spendKobans0" type="checkbox">'
                + '<input id="buyCombat" type="checkbox" checked>';
            const buyCombat = document.getElementById('buyCombat') as HTMLInputElement;
            preventKobanUsingSwitchUnauthorized.call(buyCombat);
            jest.advanceTimersByTime(500);
            expect(buyCombat.checked).toBe(false);
        });

        it('keeps the switch on when koban spending is allowed', () => {
            document.body.innerHTML =
                '<input id="spendKobans0" type="checkbox" checked>'
                + '<input id="buyCombat" type="checkbox" checked>';
            const buyCombat = document.getElementById('buyCombat') as HTMLInputElement;
            preventKobanUsingSwitchUnauthorized.call(buyCombat);
            jest.advanceTimersByTime(500);
            expect(buyCombat.checked).toBe(true);
        });
    });

    describe('addEventsOnMenuItems', () => {
        it('persists checkbox changes through setStoredValue and runs newValueFunction', () => {
            const onNewValue = jest.fn();
            storedVars[PREFIX + 'Setting_myToggle'] = {
                storage: 'localStorage', HHType: 'Setting',
                valueType: 'Boolean', menuType: 'checked', newValueFunction: { apply: onNewValue },
            };
            addMenuHtml('<input id="myToggle" type="checkbox">');
            wirePorts();

            addEventsOnMenuItems();
            const input = document.getElementById('myToggle') as HTMLInputElement;
            input.checked = true;
            input.dispatchEvent(new Event('change'));
            expect(onNewValue).toHaveBeenCalledTimes(1);
            expect(setStoredValue).toHaveBeenCalledWith(PREFIX + 'Setting_myToggle', true);
        });

        it('wires custom events declared on the entry', () => {
            const onClick = jest.fn();
            storedVars[PREFIX + 'Setting_field'] = {
                HHType: 'Setting', events: { click: onClick },
            };
            addMenuHtml('<input id="field" type="text">');
            wirePorts();

            addEventsOnMenuItems();
            document.getElementById('field')!.dispatchEvent(new Event('click'));
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('ignores entries whose element is missing from the DOM', () => {
            storedVars[PREFIX + 'Setting_ghost'] = {
                HHType: 'Setting', valueType: 'Boolean', menuType: 'checked',
            };
            addMenuHtml('');
            wirePorts();
            expect(() => addEventsOnMenuItems()).not.toThrow();
            expect(setStoredValue).not.toHaveBeenCalled();
        });
    });
});
