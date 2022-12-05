import http from "../http-common"

class PlayerScorecardService{
    getAll(page = 0){
        return http.get(`/player_scorecards?page=${page}`);
    }

    get(id){
        return http.get(`/player_scorecards/id/${id}`);
    }

    getByPlayerId(playerId){
        return http.get(`/player_scorecards/tournamentId/${playerId}`)
    }

    createPlayerScorecard(data){
        return http.post("/player_scorecards/player-scorecard", data);
    }

    deletePlayerScorecard(id, playerScorecardId){
        return http.delete(`/player_scorecards/player-scorecard?id=${id}`, {data:{_id: playerScorecardId}})
    }
}
export default new PlayerScorecardService();