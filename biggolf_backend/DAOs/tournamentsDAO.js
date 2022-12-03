import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let tournaments

export default class TournamentsDAO{
    static async injectDB(conn){
        if(tournaments){
            return
        }
        try{
            console.log("Start loading tournaments...")
            const database = await conn.db(process.env.RESTBIGGOLF_NS)
            tournaments = database.collection("tournaments")
            console.log("Finished loading tournaments!")
        } catch(e){
            console.error(
                `Unable to establish connection handle in tournamentsDAO: ${e}`,
            )
        }
    }

    static async getTournaments({
        filters = null,
        page = 0,
        tournamentsPerPage = 20,
    } = {}) {
        let query
        if(filters){
            if("name" in filters){
                query = {$text: {$search: filters["name"]}}
            }
            else if("date" in filters){
                query = {$text: {$search: filters["date"]}}
            }
        }

        let cursor
        try{
            cursor = await tournaments
                .find(query)
        } catch(e){
            console.error(`Unable to issue find command, ${e}`)
            return {tournamentsList: [], totalNumTournaments: 0}
        }

        const displayCursor = cursor.limit(tournamentsPerPage).skip(tournamentsPerPage * page)

        try{
            const tournamentsList = await displayCursor.toArray()
            const totalNumTournaments = await tournaments.countDocuments(query)

            return {tournamentsList, totalNumTournaments}
        } catch(e){
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return {tournamentsList: [], totalNumTournaments: 0}
        }
    }

    static async addTournament(course, date){
        try{
            const tournamentDoc = {
                course: course,
                date: date,
            }
            return await tournaments.insertOne(tournamentDoc)
        } catch(e){
            console.error(`Unable to post tournament: ${e}`)
            return {error: e}
        }
    }

    static async updateTournament(tournamentId, tCourse, tDate){
        try{
            const updateResponse = await tournaments.updateOne(
                {_id: ObjectId(tournamentId)},
                {$set: {course: tCourse, date: tDate }},
            )
            console.log("Found Tournament!")
            return updateResponse
        } catch(e){
            console.error(`Unable to update tournament: ${e}`)
            return {error: e}
        }
    }

    static async deleteTournament(tournamentId){
        try{
            const tournamentResponse = await tournaments.deleteOne({
                _id: ObjectId(tournamentId),
            })

            return tournamentResponse
        } catch(e){
            console.error(`Unable to delete tournament: ${e}`)
            return {error: e}
        }
    }
}