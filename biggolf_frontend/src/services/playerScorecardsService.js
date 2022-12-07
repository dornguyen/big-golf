import http from "../http-common"

class PlayerScorecardService{
    getAll(page = 0){
        return http.get(`/player_scorecards?page=${page}`);
    }

    get(id){
        return http.get(`/player_scorecards/id/${id}`);
    }

    getByPlayerId(playerId){
        return http.get(`/player_scorecards/playerId/${playerId}`)
    }

    getScorecardsByCourseScorecardId(courseScorecardId){
        return http.get(`/player_scorecards?page=0courseScorecardId=${courseScorecardId}`);
    }

    createPlayerScorecard(data){
        return http.post("/player_scorecards/player-scorecard", data);
    }

    deletePlayerScorecard(playerScorecardId){
        return http.delete("/player_scorecards/player-scorecard", {data:{playerScorecardId: playerScorecardId}})
    }
}
export default new PlayerScorecardService();