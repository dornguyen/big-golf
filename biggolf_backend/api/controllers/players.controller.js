import PlayersDAO from "../../DAOs/playersDAO.js"

export default class PlayersController{
    static async apiGetPlayers(req, res, next){
        const playersPerPage = req.query.playersPerPage ? parseInt(req.query.playersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.name){
            filters.name = req.query.name
        }

        const {playersList, totalNumPlayers} = await PlayersDAO.getPlayers({
            filters,
            page,
            playersPerPage,
        })

        let response = {
            players: playersList,
            page: page,
            filters: filters,
            entries_per_page: playersPerPage,
            total_results: totalNumPlayers,
        }
        
        res.json(response)
    }

    static async apiPostPlayer(req, res, next){
        try{
            const firstname = req.body.firstname
            const lastname = req.body.lastname

            const playerResponse = await PlayersDAO.addPlayer(
                firstname,
                lastname,
            )
            res.json({status: "Player successfully added"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdatePlayer(req, res, next){
        try{
            const playerId = req.body.player_id
            console.log(playerId)
            const firstname = req.body.firstname
            const lastname = req.body.lastname

            const playerResponse = await PlayersDAO.updatePlayer(
                playerId,
                firstname,
                lastname,
            )

            var {error} = playerResponse
            if(error){
                res.status(400).json({error})
            }

            if(playerResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update player"
                )
            }

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeletePlayer(req, res, next){
        try{
            const playerId = req.body.player_id
            console.log(playerId)
            const playerResponse = await PlayersDAO.deletePlayer(
                playerId,
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
}