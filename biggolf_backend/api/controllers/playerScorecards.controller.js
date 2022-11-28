import PlayerScorecardDAO from "../../DAOs/playerScorecardsDAO.js"

export default class PlayerScorecardController{
    static async apiGetPlayerScorecards(req, res, next){
        const playerScorecardsPerPage = req.query.playerScorecardsPerPage ? parseInt(req.query.playerScorecardsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters
        if(req.query.courseScorecardId){
            filters.courseScorecardId = req.query.courseScorecardId
        } else if(req.query.playerId){
            filters.playerId = req.query.playerId
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

    static async apiPostPlayerScorecard(req, res, next){
        try{
            const courseScorecardId = req.body.courseScorecardId
            const playerId = req.body.playerId
            const hole_scores = req.body.hole_scores

            const courseScorecardResponse = await PlayerScorecardDAO.addPlayerScorecard(
                courseScorecardId,
                playerId,
                hole_scores,
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

            const playerScorecardResponse = await PlayerScorecardDAO.updatePlayerScorecard(
                playerScorecardId,
                hole_scores,
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