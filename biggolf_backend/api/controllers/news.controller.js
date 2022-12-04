import mongodb from "mongodb"
import NewsDAO from "../../DAOs/newsDAO.js"

export default class NewsController{
    static async apiGetNews(req, res, next){
        const newsPerPage = req.query.newsPerPage ? parseInt(req.query.newsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.newsId){
            filters.newsId = req.query.newsId
        }

        const {newsList, totalNumNews} = await NewsDAO.getNews({
            filters,
            page,
            newsPerPage,
        })

        let response = {
            news: newsList,
            page: page,
            filters: filters,
            entries_per_page: newsPerPage,
            total_results: totalNumNews,
        }
        
        res.json(response)
    }

    static async apiGetNewsItemById(req, res, next){
        try{
            let id = req.params.id || {}
            let news = await NewsDAO.getNewsItemById(id)
            if(!news){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(news)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiPostNewsItem(req, res, next){
        try{
            const date = new Date();
            const month = date.getMonth()+1;
            const day = date.getDay();
            const year = date.getFullYear();

            const subject = req.body.subject;
            const description = req.body.description;

            const newsResponse = await NewsDAO.addNewsItem(
                month,
                day,
                year,
                subject,
                description
            )

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.messsage})
        }
    }

    static async apiUpdateNewsItem(req, res, next){
        try{
            const date = new Date()
            const month = date.getMonth()+1;
            const day = date.getDay();
            const year = date.getFullYear();
            
            const newsId = req.body.newsId;
            const subject = req.body.subject;
            const description = req.body.description;
            

            const newsResponse = await NewsDAO.updateNewsItem(
                newsId,
                month,
                day,
                year,
                subject,
                description
            )

            var {error} = newsResponse
            if(error){
                res.status(400).json({error})
            }

            if(newsResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update news"
                )
            }

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteNewsItem(req, res, next){
        try{
            const newsId = req.body.newsId
            console.log(newsId)
            const newsResponse = await NewsDAO.deleteNewsItem(
                newsId,
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
}