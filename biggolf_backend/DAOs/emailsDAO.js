import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let emails

export default class EmailsDAO{
    static async injectDB(conn){
        if(emails){
            return
        }
        try{
            console.log("Start loading email list...")
            const database = await conn.db(process.env.RESTBIGGOLF_NS)
            emails = database.collection("emails")
            console.log("Finished loading email list!")
        } catch(e){
            console.error(
                `Unable to establish a connection handle in emailsDAO: ${e}`,
            )
        }
    }

    static async getEmails({
        filters = null,
        page = 0,
        emailsPerPage = 20,
    } = {}){
        let query
        if(filters){
            if("emailId" in filters){
                query = {$text: {$search: filters["emailId"]}}
            }
        }

        let cursor
        try{
            cursor = await emails
                .find(query)
        } catch(e){
            console.error(`Unable to issue find command, ${e}`)
            return {emailList: [], totalNumEmails: 0}
        }

        const displayCursor = cursor.limit(emailsPerPage).skip(emailsPerPage * page)
        
        try{
            const emailsList = await displayCursor.toArray()
            const totalNumEmails = await emails.countDocuments(query)

            return {emailsList, totalNumEmails}
        } catch(e){
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return {emailsList: [], totalNumEmails: 0}
        }
    }

    static async addEmail(address){
        try{
            const emailDoc = {
                email: address,
            }
            return await emails.insertOne(emailDoc)
        } catch(e){
            console.error(`Unable to post email address: ${e}`)
            return {error: e}
        }
    }

    static async updateEmail(e_id, address){
        try{
            const updateResponse = await emails.updateOne(
                {_id: ObjectId(e_id)},
                {$set: {email: address}},
            )
            return updateResponse
        } catch(e){
            console.error(`Unable to update email address: ${e}`)
            return {error: e}
        }
    }

    static async deleteEmail(e_id){
        try{
            const emailResponse = await emails.deleteOne({
                _id: ObjectId(e_id),
            })
            return emailResponse
        } catch(e){
            console.error(`Unable to delete email address: ${e}`)
            return {error: e}
        }
    }
}