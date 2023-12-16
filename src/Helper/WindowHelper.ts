export class WindowHelper {
    static getWindow() {
        return (typeof unsafeWindow == 'undefined') ?  window : unsafeWindow;
    }
}