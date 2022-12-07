import express from "express"
import NewsCtrl from "../controllers/news.controller.js"

const router = express.Router()

router.route("/").get(NewsCtrl.apiGetNews)
router.route("/id/:id").get(NewsCtrl.apiGetNewsItemById)
router
    .route("/news")
    .post(NewsCtrl.apiPostNewsItem)
    .put(NewsCtrl.apiUpdateNewsItem)
    .delete(NewsCtrl.apiDeleteNewsItem)

export default router