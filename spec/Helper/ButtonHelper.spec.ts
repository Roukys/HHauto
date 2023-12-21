import {
    getGoToChangeTeamButton,
    getGoToClubChampionButton
} from '../../src/Helper/ButtonHelper'
import { ConfigHelper } from '../../src/Helper/ConfigHelper';

describe("ButtonHelper", function() {

  beforeEach(function() {
    ConfigHelper.getHHScriptVars = jest.fn().mockReturnValue('champ.html')
  });

  describe("getGoToChangeTeamButton", function() {
    it("default", function() {
      expect(getGoToChangeTeamButton()).toBe("<div class=\"change_team_container\"><a id=\"change_team\" href=\"/teams.html\" class=\"blue_button_L\" anim-step=\"afterStartButton\"><div>Change team</div></a></div>");
    });
  });

  describe("getGoToClubChampionButton", function() {
    it("default", function() {
      expect(getGoToClubChampionButton()).toBe("<button data-href=\"champ.html\" class=\"blue_button_L hh-club-poa\">Go To Club Champion</button>");
    });
  });
});