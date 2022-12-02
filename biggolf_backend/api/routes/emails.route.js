import express from "express"
import EmailsCtrl from "../controllers/emails.controller.js"

const router = express.Router()

router.route("/").get(EmailsCtrl.apiGetEmails)

router
    .route("/email")
    .post(EmailsCtrl.apiPostEmail)
    .put(EmailsCtrl.apiUpdateEmail)
    .delete(EmailsCtrl.apiDeleteEmail)

export default router