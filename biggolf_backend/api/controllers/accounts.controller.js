import mongodb from "mongodb"
import AccountsDAO from "../../DAOs/accountsDAO.js"

export default class AccountsController{
    static async apiGetAccounts(req, res, next){
        const accountsPerPage = req.query.accountsPerPage ? parseInt(req.query.accountsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.accountId){
            filters.accountId = req.query.accountId
        }

        const {accountsList, totalNumAccounts} = await AccountsDAO.getAccounts({
            filters,
            page,
            accountsPerPage,
        })

        let response = {
            accounts: accountsList,
            page: page,
            filters: filters,
            entries_per_page: accountsPerPage,
            total_results: totalNumAccounts,
        }
        
        res.json(response)
    }

    static async apiGetAccountByCredentials(req, res, next){
        try{
            let username = req.params.username || {}
            let password = req.params.password || {}
            let account = await AccountsDAO.getAccountByCredentials(username, password)
            if(!account){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(account)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
    
    static async apiPostAccount(req, res, next){
        try{
            const username = req.body.username
            const password = req.body.password
            const accountResponse = await AccountsDAO.addAccount(
                username,
                password
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateAccount(req, res, next){
        try{
            const accountId = req.body.accountId
            const username = req.body.username
            const password = req.body.password
            const accountResponse = await AccountsDAO.updateAccount(
                accountId,
                username,
                password,
            )

            var {error} = accountResponse
            if(error){
                res.status(400).json({error})
            }
            if(accountResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update account"
                )
            }

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteAccount(req, res, next){
        try{
            const accountId = req.body.accountId
            console.log(accountId)
            const accountResponse = await AccountsDAO.deleteAccount(
                accountId
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
}