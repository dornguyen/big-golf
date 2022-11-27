import express from "express"
import TournamentsCtrl from "./tournaments.controller.js"

const router = express.Router()

router.route("/").get(TournamentsCtrl.apiGetTournaments)

router
    .route("/tournament")
    .post(TournamentsCtrl.apiPostTournament)

export default router