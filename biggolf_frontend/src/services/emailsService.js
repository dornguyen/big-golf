import http from "../http-common";

class EmailsDataService{
    getAll(page = 0){
        return http.get(`/emails?page=${page}`);
    }

    addEmail(data){
        return http.post("/emails/email", data);
    }

    deleteEmail(id, emailId){
        return http.delete(`/news/news?id=${id}`, {data:{emailId: emailId}});
    }
}

export default new EmailsDataService();