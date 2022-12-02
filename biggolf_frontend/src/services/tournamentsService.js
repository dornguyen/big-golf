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

    createPlayer(data){
        return http.post("/tournaments/tournament", data);
    }

    updatePlayer(data){
        return http.put("/tournaments/tournament", data);
    }

    deletePlayer(id, tournamentId){
        return http.delete(`/tournaments/tournament?id=${id}`, {data:{tournamentId: tournamentId}});
    }
}

export default new TournamentDataService();