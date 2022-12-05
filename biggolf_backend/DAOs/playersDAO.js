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
            const database = await conn.db(process.env.RESTBIGGOLF_NS)
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

    static async getPlayerById(id){
        try{
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "player_scorecards",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$playerId", id],
                                    },
                                },
                            },
                        ],
                        as: "player_scorecards",
                    },
                },
                {
                    $addFields: {
                        course_scorecards: "$course_scorecards",
                        player_scorecards: "$player_scorecards",
                    }
                }
            ]
            return await players.aggregate(pipeline).next()
        } catch(e){
            console.error(`Something went wrong in getPlayerById: ${e}`)
            throw e
        }
    }

    static async addPlayer(fullname){
        try{
            const playerDoc = {
                name: fullname
            }
            return await players.insertOne(playerDoc)
        } catch(e){
            console.error(`Unable to post player: ${e}`)
            return {error: e}
        }
    }

    static async updatePlayer(playerId, fullname){
        try{
            const updateResponse = await players.updateOne(
                {_id: ObjectId(playerId)},
                {$set: {name: fullname}},
            )
            console.log("Found Player!")
            return updateResponse
        } catch(e){
            console.error(`Unable to update player: ${e}`)
            return {error: e}
        }
    }

    static async deletePlayer(playerId){
        try{
            const playerResponse = await players.deleteOne({
                _id: ObjectId(playerId),
            })

            return playerResponse
        } catch(e){
            console.error(`Unable to delete player: ${e}`)
            return {error: e}
        }
    }
}