import TournamentsDAO from "../dao/tournamentsDAO.js"

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
            const tournamentName = req.body.tournamentName
            const date = req.body.date

            const tournamentResponse = await TournamentsDAO.addTournament(
                tournamentName,
                date,
            )
            res.json({status: "Tournament successfully added"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
}