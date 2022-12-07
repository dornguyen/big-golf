import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let accounts

export default class AccountsDAO{
    static async injectDB(conn){
        if(accounts){
            return
        }
        try{
            console.log("Start loading accounts...")
            const database = await conn.db(process.env.RESTBIGGOLF_NS)
            accounts = database.collection("accounts")
            console.log("Finished loading accounts!")
        } catch(e){
            console.error(
                `Unable to establish a connection handle in accountsDAO: ${e}`,
            )
        }
    }

    static async getAccounts({
        filters = null,
        page = 0,
        accountsPerPage = 20,
    } = {}){
        let query
        if(filters){
            if("accountId" in filters){
                query = {$text: {$search: filters["accountId"]}}
            }
        }

        let cursor
        try{
            cursor = await accounts
                .find(query)
        } catch(e){
            console.error(`Unable to issue find command, ${e}`)
            return {accountList: [], totalNumAccounts: 0}
        }

        const displayCursor = cursor.limit(accountsPerPage).skip(accountsPerPage * page)
        
        try{
            const accountsList = await displayCursor.toArray()
            const totalNumAccounts = await accounts.countDocuments(query)

            return {accountsList, totalNumAccounts}
        } catch(e){
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return {accountsList: [], totalNumAccounts: 0}
        }
    }

    static async getAccountByCredentials(username, password){
        try{
            const pipeline = [
                {
                    $match: {
                        username: username,
                        password: password,
                    }
                }
            ]
            return await accounts.aggregate(pipeline).next()
        } catch(e){
            console.error(`Something went wrong in getAccountByCredentials: ${e}`)
            throw e
        }
    }

    static async addAccount(username, password){
        try{
            const accountDoc = {
                username: username,
                password: password,
            }
            return await accounts.insertOne(accountDoc)
        } catch(e){
            console.error(`Unable to post account: ${e}`)
            return {error: e}
        }
    }

    static async updateAccount(accountId, user, pass){
        try{
            const updateResponse = await accounts.updateOne(
                {_id: ObjectId(accountId)},
                {$set: {username: user, password: pass}},
            )
            return updateResponse
        } catch(e){
            console.error(`Unable to update account: ${e}`)
            return {error: e}
        }
    }

    static async deleteAccount(accountId){
        try{
            const accountResponse = await accounts.deleteOne({
                _id: ObjectId(accountId),
            })
            return accountResponse
        } catch(e){
            console.error(`Unable to delete account: ${e}`)
            return {error: e}
        }
    }
}