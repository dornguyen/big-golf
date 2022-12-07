import http from "../http-common";

class TournamentDataService{
    getAll(page = 0){
        return http.get(`/tournaments?page=${page}`);
    }

    get(id){
        return http.get(`/tournaments/id/${id}`);
    }

    find(query, by = "name", page = 0){
        return http.get(`/tournaments?${by}=${query}&page=${page}`);
    }

    createTournament(data){
        return http.post("/tournaments/tournament", data);
    }

    updateTournament(data){
        return http.put("/tournaments/tournament", data);
    }

    deleteTournament(tournamentId){
        return http.delete(`/tournaments/tournament`, {data:{tournamentId: tournamentId}});
    }
}

export default new TournamentDataService();