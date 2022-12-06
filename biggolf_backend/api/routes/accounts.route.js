import express from "express"
import AccountsCtrl from "../controllers/accounts.controller.js"

const router = express.Router()

router.route("/").get(AccountsCtrl.apiGetAccounts)
router.route("/username/:username/password/:password").get(AccountsCtrl.apiGetAccountByCredentials)

router
    .route("/account")
    .post(AccountsCtrl.apiPostAccount)
    .put(AccountsCtrl.apiUpdateAccount)
    .delete(AccountsCtrl.apiDeleteAccount)

export default router