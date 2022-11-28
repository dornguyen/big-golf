import mongodb from "mongodb"
import EmailsDAO from "../../DAOs/emailsDAO.js"

export default class EmailsController{
    static async apiGetEmails(req, res, next){
        const emailsPerPage = req.query.emailsPerPage ? parseInt(req.query.emailsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.emailId){
            filters.emailId = req.query.emailId
        }

        const {emailsList, totalNumEmails} = await EmailsDAO.getEmails({
            filters,
            page,
            emailsPerPage,
        })

        let response = {
            emails: emailsList,
            page: page,
            filters: filters,
            entries_per_page: emailsPerPage,
            total_results: totalNumEmails,
        }
        
        res.json(response)
    }

    static async apiPostEmail(req, res, next){
        try{
            const email = req.body.email
            const emailResponse = await EmailsDAO.addEmail(
                email,
            )

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.messsage})
        }
    }

    static async apiUpdateEmail(req, res, next){
        try{
            const emailId = req.body.emailId
            const email = req.body.email
            const emailResponse = await EmailsDAO.updateEmail(
                emailId,
                email,
            )

            var {error} = emailResponse
            if(error){
                res.status(400).json({error})
            }
            if(emailResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update email"
                )
            }

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteEmail(req, res, next){
        try{
            const emailId = req.body.emailId
            console.log(emailId)
            const emailResponse = await EmailsDAO.deleteEmail(
                emailId,
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
}