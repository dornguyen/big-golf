import express from "express"
import PlayerScorecardCtrl from "../controllers/playerScorecards.controller.js"

const router = express.Router()

router.route("/").get(PlayerScorecardCtrl.apiGetPlayerScorecards)
router.route("/id/:id").get(PlayerScorecardCtrl.apiGetPlayerScorecardById)
router.route("/playerId/:playerId").get(PlayerScorecardCtrl.apiGetPlayerScorecardByPlayerId)

router
    .route("/player-scorecard")
    .post(PlayerScorecardCtrl.apiPostPlayerScorecard)
    .put(PlayerScorecardCtrl.apiUpdatePlayerScorecard)
    .delete(PlayerScorecardCtrl.apiDeletePlayerScorecard)

export default router