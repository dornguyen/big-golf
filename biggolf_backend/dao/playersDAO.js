import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let players

export default class PlayersDAO{
    static async injectDB(conn){
        if(players){
            return
        }
        try{
            console.log("Start loading players...")
            const database = await conn.db(process.env.RESTPLAYERS_NS)
            players = database.collection("players")
            console.log("Finished loading players!")
        } catch(e){
            console.error(
                `Unable to establish a connection handle in playersDAO: ${e}`,
            )
        }
    }

    static async getPlayers({
        filters = null,
        page = 0,
        playersPerPage = 20,
    } = {}) {
        let query
        if(filters){
            if("name" in filters){
                query = {$text:{$search: filters["name"]}}
            }
        }

        let cursor
        try{
            cursor = await players
                .find(query)
        } catch(e){
            console.error(`Unable to issue find command, ${e}`)
            return {playersList: [], totalNumPlayers: 0}
        }
        
        const displayCursor = cursor.limit(playersPerPage).skip(playersPerPage * page)

        try{
            const playersList = await displayCursor.toArray()
            const totalNumPlayers = await players.countDocuments(query)

            return {playersList, totalNumPlayers}
        } catch(e){
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return {playersList: [], totalNumPlayers: 0}
        }
    }

    static async addPlayer(fname, lname){
        try{
            const playerDoc = {
                firstname: fname,
                lastname: lname,
            }
            return await players.insertOne(playerDoc)
        } catch(e){
            console.error(`Unable to post player: ${e}`)
            return {error: e}
        }
    }
}