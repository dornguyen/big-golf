import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let playerScorecards

export default class CourseScorecardsDAO{
    static async injectDB(conn){
        if(playerScorecards){
            return
        }
        try{
            console.log("Start loading player scorecards...")
            const database = await conn.db(process.env.RESTBIGGOLF_NS)
            playerScorecards = database.collection("player_scorecards")
            console.log("Finished loading player scorecards!")
        } catch(e){
            console.error(
                `Unable to establish a connection handle in playerScorecardsDAO: ${e}`,
            )
        }
    }

    static async getPlayerScorecards({
        filters = null,
        page = 0,
        playerScorecardsPerPage = 20,
    } = {}) {
        let query
        if(filters){
            if("courseScorecardId" in filters){
                query = {"courseScorecardId": {$eq: filters["courseScorecardId"]}}
            } else if("playerId" in filters){
                query = {"playerId": {$eq: filters["playerId"]}}
            } else if("tournamentId" in filters){
                query = {"tournamentId": {$eq: filters["tournamentId"]}}
            }
        }

        let cursor
        try{
            cursor = await playerScorecards
                .find(query)
        } catch(e){
            console.error(`Unable to issue find commnad, ${e}`)
            return {playerScorecardsList: [], totalNumPlayerScorecards: 0}
        }

        const displayCursor = cursor.limit(playerScorecardsPerPage).skip(playerScorecardsPerPage * page)
        
        try{
            const playerScorecardsList = await displayCursor.toArray()
            const totalNumPlayerScorecards = await playerScorecards.countDocuments(query)

            return {playerScorecardsList, totalNumPlayerScorecards}
        } catch(e){
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return {playerScorecardsList: [], totalNumPlayerScorecards: 0}
        }
    }

    static async getPlayerScorecardById(id){
        try{
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
            ]
            return await playerScorecards.aggregate(pipeline).next()
        } catch(e){
            console.error(`Something went wrong in getPlayerScorecardById: ${e}`)
            throw e
        }
    }

    static async getPlayerScorecardByPlayerId(id){
        try{
            const pipeline = [
                {
                    $match: {
                        playerId: id
                    },
                },
            ]
            return await playerScorecards.aggregate(pipeline).next()
        } catch(e){
            console.error(`Something went wrong in getPlayerScorecardByPlayerId: ${e}`)
            throw e
        }
    }

    static async addPlayerScorecard(courseScorecard_id, par_holes, player_id, player_name, tournament_id, course, date, scores, handicap, classFlight){
        try{
            const playerScorecardDoc = {
                courseScorecardId: courseScorecard_id,
                par_holes: par_holes,
                playerId: player_id,
                playerName: player_name,
                tournamentId: tournament_id,
                course: course,
                date: date,
                hole_scores: scores,
                handicap: handicap,
                classFlight: classFlight
            }
            return await playerScorecards.insertOne(playerScorecardDoc)
        } catch(e){
            console.error(`Unable to post player scorecard: ${e}`)
            return {error: e}
        }
    }

    static async updatePlayerScorecard(playerScorecard_Id, scores, handicap, classFlight){
        try{
            const updateResponse = await playerScorecards.updateOne(
                {_id: ObjectId(playerScorecard_Id)},
                {$set: {hole_scores: scores, handicap: handicap, classFlight: classFlight}},
            )
            console.log("Found Player Scorecard!")
            return updateResponse
        } catch(e){
            console.error(`Unable to update player scorecard: ${e}`)
            return {error: e}
        }
    }

    static async deletePlayerScorecard(playerScorecardId){
        try{
            const playerScorecardResponse = await playerScorecards.deleteOne({
                _id: ObjectId(playerScorecardId)
            })

            return playerScorecardResponse
        } catch(e){
            console.error(`Unable to delete player scorecard: ${e}`)
            return {error: e}
        }
    }
}