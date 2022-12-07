import CourseScorecardDAO from "../../DAOs/courseScorecardsDAO.js"

export default class CourseScorecardController{
    static async apiGetCourseScorecards(req, res, next){
        const courseScorecardsPerPage = req.query.courseScorecardsPerPage ? parseInt(req.query.courseScorecardsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.tournamentId){
            filters.tournamentId = req.query.tournamentId
        }

        const {courseScorecardsList, totalNumCourseScorecards} = await CourseScorecardDAO.getCourseScorecards({
            filters,
            page,
            courseScorecardsPerPage,
        })

        let response = {
            courseScorecards: courseScorecardsList,
            page: page,
            filters: filters,
            entries_per_page: courseScorecardsPerPage,
            total_results: totalNumCourseScorecards
        }

        res.json(response)
    }

    static async apiGetCourseScorecardById(req, res, next){
        try{
            let id = req.params.id || {}
            let courseScorecard = await CourseScorecardDAO.getCourseScorecardById(id)
            if(!courseScorecard){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(courseScorecard)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetCourseScorecardByTournamentId(req, res, next){
        try{
            let tournamentId = req.params.tournamentId || {}
            let courseScorecard = await CourseScorecardDAO.getCourseScorecardByTournamentId(tournamentId)
            if(!courseScorecard){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(courseScorecard)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiPostCourseScorecard(req, res, next){
        try{
            const tournamentId = req.body.tournamentId
            const par_holes = req.body.par_holes

            const courseScorecardResponse = await CourseScorecardDAO.addCourseScorecard(
                tournamentId,
                par_holes,
            )
            res.json({status: "Course Scorecard successfully added"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateCourseScorecard(req, res, next){
        try{
            const courseScorecardId = req.body.courseScorecard_id
            console.log(courseScorecardId)
            const par_holes = req.body.par_holes

            const courseScorecardResponse = await CourseScorecardDAO.updateCourseScorecard(
                courseScorecardId,
                par_holes,
            )

            var{error} = courseScorecardResponse
            if(error){
                res.status(400).json({error})
            }
            if(courseScorecardResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update course scorecard"
                )
            }

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteCourseScorecard(req, res, next){
        try{
            const courseScorecardId = req.body.courseScorecard_id
            console.log(courseScorecardId)
            const courseScorecardResponse = await CourseScorecardDAO.deleteCourseScorecard(
                courseScorecardId,
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteCourseScorecardByTournamentId(req, res, next){
        try{
            const tournamentId = req.body.tournamentId
            console.log("tournamentId: " + tournamentId)
            const response = await CourseScorecardDAO.deleteCourseScorecardByTournamentId(
                tournamentId,
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
}