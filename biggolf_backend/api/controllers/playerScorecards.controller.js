import CourseScorecardsDAO from "../../DAOs/courseScorecardsDAO.js"
import PlayerScorecardDAO from "../../DAOs/playerScorecardsDAO.js"
import PlayersDAO from "../../DAOs/playersDAO.js"
import TournamentsDAO from "../../DAOs/tournamentsDAO.js"

export default class PlayerScorecardController{
    static async apiGetPlayerScorecards(req, res, next){
        const playerScorecardsPerPage = req.query.playerScorecardsPerPage ? parseInt(req.query.playerScorecardsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.courseScorecardId){
            filters.courseScorecardId = req.query.courseScorecardId
        } else if(req.query.playerId){
            filters.playerId = req.query.playerId
        } else if(req.query.tournamentId){
            filters.tournamentId = req.query.tournamentId
        }

        const {playerScorecardsList, totalNumPlayerScorecards} = await PlayerScorecardDAO.getPlayerScorecards({
            filters,
            page,
            playerScorecardsPerPage,
        })

        let response = {
            playerScorecards: playerScorecardsList,
            page: page,
            filters: filters,
            entries_per_page: playerScorecardsPerPage,
            total_results: totalNumPlayerScorecards
        }

        res.json(response)
    }

    static async apiGetPlayerScorecardById(req, res, next){
        try{
            let id = req.params.id || {}
            let playerScorecard = await PlayerScorecardDAO.getPlayerScorecardById(id)
            if(!playerScorecard){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(playerScorecard)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetPlayerScorecardByPlayerId(req, res, next){
        try{
            let playerId = req.params.playerId || {}
            let playerScorecard = await PlayerScorecardDAO.getPlayerScorecardByPlayerId(playerId)
            if(!playerScorecard){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(playerScorecard)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiPostPlayerScorecard(req, res, next){
        try{
            const courseScorecardId = req.body.courseScorecardId
            const courseScorecard = await CourseScorecardsDAO.getCourseScorecardById(req.body.courseScorecardId)
            const par_holes = courseScorecard.par_holes
            const playerId = req.body.playerId
            const player = await PlayersDAO.getPlayerById(req.body.playerId)
            const playerName = player.name
            const tournamentId = req.body.tournamentId
            const tournament = await TournamentsDAO.getTournamentById(req.body.tournamentId)
            const course = tournament.course
            const date = tournament.date
            const hole_scores = req.body.hole_scores
            const handicap = req.body.handicap
            const classFlight = req.body.classFlight

            const courseScorecardResponse = await PlayerScorecardDAO.addPlayerScorecard(
                courseScorecardId,
                par_holes,
                playerId,
                playerName,
                tournamentId,
                course,
                date,
                hole_scores,
                handicap,
                classFlight
            )
            res.json({status: "Player Scorecard successfully added"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdatePlayerScorecard(req, res, next){
        try{
            const playerScorecardId = req.body.playerScorecardId
            console.log(playerScorecardId)
            const hole_scores = req.body.hole_scores
            const handicap = req.body.handicap
            const classFlight = req.body.classFlight

            const playerScorecardResponse = await PlayerScorecardDAO.updatePlayerScorecard(
                playerScorecardId,
                hole_scores,
                handicap,
                classFlight
            )

            var{error} = playerScorecardResponse
            if(error){
                res.status(400).json({error})
            }
            if(playerScorecardResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update player scorecard"
                )
            }

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeletePlayerScorecard(req, res, next){
        try{
            const playerScorecardId = req.body.playerScorecardId
            console.log(playerScorecardId)
            const playerScorecardResponse = await PlayerScorecardDAO.deletePlayerScorecard(
                playerScorecardId,
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
}