import http from "../http-common";

class AccountDataService{
    getAll(page = 0){
        return http.get()
    }

    getByCredentials(username, password){
        return http.get(`/accounts/username/${username}/password/${password}`);
    }
}
export default new AccountDataService();