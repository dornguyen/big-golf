import http from "../http-common";

class PlayerDataService{
    getAll(page = 0){
        return http.get(`/players?page=${page}`);
    }

    get(id){
        return http.get(`/players/id/${id}`);
    }

    find(query, by = "name", page = 0){
        return http.get(`/players?${by}=${query}&page=${page}`);
    }

    createPlayer(data){
        return http.post("/players/player", data);
    }

    updatePlayer(data){
        return http.put("/players/player", data);
    }

    deletePlayer(playerId){
        return http.delete("/players/player", {data:{playerId: playerId}});
    }
}

export default new PlayerDataService();