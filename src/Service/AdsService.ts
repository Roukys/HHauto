import { randomInterval } from "../Helper/TimeHelper";

export class AdsService {
    static closeHomeAds() {

        if ($('#ad_home close:visible').length) {
            setTimeout(() => {
                $('#ad_home close').trigger('click')
            }, randomInterval(1500, 5000));
        }
    }
}