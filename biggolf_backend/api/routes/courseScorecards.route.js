import express from "express"
import CourseScorecardCtrl from "../controllers/courseScorecards.controller.js"

const router = express.Router()

router.route("/").get(CourseScorecardCtrl.apiGetCourseScorecards)
router.route("/id/:id").get(CourseScorecardCtrl.apiGetCourseScorecardById)
router.route("/tournamentId/:tournamentId").get(CourseScorecardCtrl.apiGetCourseScorecardByTournamentId)

router
    .route("/course-scorecard")
    .post(CourseScorecardCtrl.apiPostCourseScorecard)
    .put(CourseScorecardCtrl.apiUpdateCourseScorecard)
    .delete(CourseScorecardCtrl.apiDeleteCourseScorecard)

export default router