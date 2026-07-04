// Shared test fixture: builds a fully-wired MenuPortsShape with inert
// defaults so each menu spec only overrides what it asserts on.
// Not a .spec file on purpose — it must not register a test suite.

import { MenuPortsShape } from '../../../src/Helper/menu/MenuPorts';

export function buildTestPorts(overrides: Partial<MenuPortsShape> = {}): MenuPortsShape {
    return {
        getTextForUI: (id: string, type: string) => `${id}:${type}`,
        getHHScriptVars: (id: string) => `[${id}]`,
        getStoredValue: () => null,
        getStorageItem: () => ({} as unknown as Storage),
        setStoredValue: () => undefined,
        HHStoredVars: {},
        storedVarPrefix: 'HHAuto_',
        logHHAuto: () => undefined,
        setDefaults: () => undefined,
        isDisplayedHHPopUp: () => false,
        ...overrides,
    };
}
