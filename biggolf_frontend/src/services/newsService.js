import http from "../http-common";

class NewsDataService{
    getAll(page = 0){
        return http.get(`/news?page=${page}`);
    }

    get(id){
        return http.get(`/news/id/${id}`);
    }

    createNews(data){
        return http.post("/news/news", data);
    }

    updateNews(data){
        return http.put("/news/news", data);
    }

    deleteNews(id, newsId){
        return http.delete(`/news/news?id=${id}`, {data:{newsId: newsId}});
    }
}

export default new NewsDataService();