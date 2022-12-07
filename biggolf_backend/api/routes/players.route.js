import express from "express"
import PlayersCtrl from "../controllers/players.controller.js"

const router = express.Router()

router.route("/").get(PlayersCtrl.apiGetPlayers)
router.route("/id/:id").get(PlayersCtrl.apiGetPlayerById)

router
    .route("/player")
    .post(PlayersCtrl.apiPostPlayer)
    .put(PlayersCtrl.apiUpdatePlayer)
    .delete(PlayersCtrl.apiDeletePlayer)

export default router