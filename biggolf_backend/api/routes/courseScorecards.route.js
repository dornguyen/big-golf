import express from "express"
import CourseScorecardCtrl from "../controllers/courseScorecards.controller.js"

const router = express.Router()

router.route("/").get(CourseScorecardCtrl.apiGetCourseScorecards)

router
    .route("/course-scorecard")
    .post(CourseScorecardCtrl.apiPostCourseScorecard)
    .put(CourseScorecardCtrl.apiUpdateCourseScorecard)
    .delete(CourseScorecardCtrl.apiDeleteCourseScorecard)

export default router