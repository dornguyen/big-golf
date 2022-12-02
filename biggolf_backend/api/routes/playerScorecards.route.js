import express from "express"
import PlayerScorecardCtrl from "../controllers/playerScorecards.controller.js"

const router = express.Router()

router.route("/").get(PlayerScorecardCtrl.apiGetPlayerScorecards)

router
    .route("/player-scorecard")
    .post(PlayerScorecardCtrl.apiPostPlayerScorecard)
    .put(PlayerScorecardCtrl.apiUpdatePlayerScorecard)
    .delete(PlayerScorecardCtrl.apiDeletePlayerScorecard)

export default router