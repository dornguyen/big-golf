import TournamentsDAO from "../../DAOs/tournamentsDAO.js"

export default class TournamentsController{
    static async apiGetTournaments(req, res, next){
        const tournamentsPerPage = req.query.tournamentsPerPage ? parseInt(req.query.tournamentsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.name){
            filters.name = req.query.name
        }
        else if(req.query.date){
            filters.date = req.query.date
        }

        const {tournamentsList, totalNumTournaments} = await TournamentsDAO.getTournaments({
            filters,
            page,
            tournamentsPerPage,
        })

        let response = {
            tournaments: tournamentsList,
            page: page,
            filters: filters,
            entries_per_page: tournamentsPerPage,
            total_results: totalNumTournaments,
        }

        res.json(response)
    }

    static async apiPostTournament(req, res, next){
        try{
            const course = req.body.course
            const month = req.body.month
            const day = req.body.day
            const year = req.body.year

            const tournamentResponse = await TournamentsDAO.addTournament(
                course,
                month,
                day,
                year
            )
            res.json({status: "Tournament successfully added"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateTournament(req, res, next){
        try{
            const tournamentId = req.body.tournament_id
            console.log(tournamentId)
            const course = req.body.course
            const month = req.body.month
            const day = req.body.day
            const year = req.body.year

            const tournamentResponse = await TournamentsDAO.updateTournament(
                tournamentId,
                course,
                month,
                day,
                year
            )

            var {error} = tournamentResponse
            if(error){
                res.status(400).json({error})
            }

            if(tournamentResponse.modifiedCount === 0){
                throw new Error(
                    "unablke to update tournament"
                )
            }
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteTournament(req, res, next){
        try{
            const tournamentId = req.body.tournament_id
            console.log(tournamentId)
            const tournamentResponse = await TournamentsDAO.deleteTournament(
                tournamentId,
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
}