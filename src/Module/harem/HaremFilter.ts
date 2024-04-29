import { getStoredValue } from "../../Helper/StorageHelper";
import { TimeHelper, randomInterval } from "../../Helper/TimeHelper";
import { HHStoredVarPrefixKey } from "../../config/HHStoredVars";

export class HaremFilter {
    STARTING_INDEX = 1;
    COMMON_INDEX = 2;
    RARE_INDEX = 3;
    EPIC_INDEX = 4;
    LEGENDARY_INDEX = 5;
    MYTHIC_INDEX = 6;

    RARITY_ORDER = [this.STARTING_INDEX, this.MYTHIC_INDEX, this.LEGENDARY_INDEX, this.EPIC_INDEX, this.RARE_INDEX, this.COMMON_INDEX];
    
    openFilter() {
        $('#filter_girls').trigger('click');
    }

    resetFilter() {
        $('#reset-filters').trigger('click');
    }

    getRarityFilterValues(): any[] {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryUseFilter") === "true") {
            return getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryFilter") ? getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryFilter").split(";") : this.RARITY_ORDER;
        }
        return [];
    }

    async selectGirlRarity(rarityIndex: number = 1) {
        $('.select-group.girl-rarity-dropdown .selectric-wrapper .selectric').trigger('click');
        await TimeHelper.sleep(randomInterval(200, 400)); // wait open
        $('.select-group.girl-rarity-dropdown .selectric-items li[data-index="' + rarityIndex + '"]').trigger('click');
        await TimeHelper.sleep(randomInterval(800, 1200)); // wait loading
    }

    async selectOnlyOwnedGirls() {
        const ownedButton = $('.check-btn.shards-state[shards="100"]');
        if (ownedButton.attr('selected') == null) {
            ownedButton.trigger('click');
        }
        const hasShardButton = $('.check-btn.shards-state[shards="1-99"]');
        if (hasShardButton.attr('selected') != null) {
            hasShardButton.trigger('click');
        }
        const noShardButton = $('.check-btn.shards-state[shards="no_shards"]');
        if (noShardButton.attr('selected') != null) {
            noShardButton.trigger('click');
        }
        await TimeHelper.sleep(randomInterval(800, 1200)); // wait loading
    }

}