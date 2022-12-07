import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let courseScorecards

export default class CourseScorecardsDAO{
    static async injectDB(conn){
        if(courseScorecards){
            return
        }
        try{
            console.log("Start loading course scorecards...")
            const database = await conn.db(process.env.RESTBIGGOLF_NS)
            courseScorecards = database.collection("course_scorecards")
            console.log("Finished loading course scorecards!")
        } catch(e){
            console.error(
                `Unable to establish a connection handle in courseScorecardsDAO: ${e}`,
            )
        }
    }

    static async getCourseScorecards({
        filters = null,
        page = 0,
        courseScorecardsPerPage = 20,
    } = {}) {
        let query
        if(filters){
            if("tournamentId" in filters){
                query = {$text: {$search: filters["tournamentId"]}}
            }
        }

        let cursor
        try{
            cursor = await courseScorecards
                .find(query)
        } catch(e){
            console.error(`Unable to issue find commnad, ${e}`)
            return {couseScorecardsList: [], totalNumCourseScorecards: 0}
        }

        const displayCursor = cursor.limit(courseScorecardsPerPage).skip(courseScorecardsPerPage * page)
        
        try{
            const courseScorecardsList = await displayCursor.toArray()
            const totalNumCourseScorecards = await courseScorecards.countDocuments(query)

            return {courseScorecardsList, totalNumCourseScorecards}
        } catch(e){
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return {courseScorecardsList: [], totalNumCourseScorecards: 0}
        }
    }

    static async getCourseScorecardById(id){
        try{
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
            ]
            return await courseScorecards.aggregate(pipeline).next()
        } catch(e){
            console.error(`Something went wrong in getCourseScorecardById: ${e}`)
            throw e
        }
    }

    static async getCourseScorecardByTournamentId(id){
        try{
            const pipeline = [
                {
                    $match: {
                        tournamentId: id
                    },
                },
            ]
            return await courseScorecards.aggregate(pipeline).next()
        } catch(e){
            console.error(`Something went wrong in getCourseScorecardById: ${e}`)
        }
    }

    static async addCourseScorecard(t_Id, holes){
        try{
            const courseScorecardDoc = {
                tournamentId: ObjectId(t_Id),
                par_holes: holes,
            }
            return await courseScorecards.insertOne(courseScorecardDoc)
        } catch(e){
            console.error(`Unable to post course scorecard: ${e}`)
            return {error: e}
        }
    }

    static async updateCourseScorecard(courseScorecard_Id, holes){
        try{
            const updateResponse = await courseScorecards.updateOne(
                {_id: ObjectId(courseScorecard_Id)},
                {$set: {par_holes: holes}},
            )
            console.log("Found Course Scorecard!")
            return updateResponse
        } catch(e){
            console.error(`Unable to update course scorecard: ${e}`)
            return {error: e}
        }
    }

    static async deleteCourseScorecard(courseScorecardId){
        try{
            const courseScorecardResponse = await courseScorecards.deleteOne({
                _id: ObjectId(courseScorecardId)
            })

            return courseScorecardResponse
        } catch(e){
            console.error(`Unable to delete course scorecard: ${e}`)
            return {error: e}
        }
    }

    static async deleteCourseScorecardByTournamentId(tournamentId){
        try{
            const response = await courseScorecards.deleteOne({
                tournamentId: tournamentId
            })
            return response
        } catch(e){
            console.error(`Unable to delete course scorecard by tournamentId: ${e}`)
            return {error: e}
        }
    }
}