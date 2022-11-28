import mongodb from "mongodb"
import NewsDAO from "../../DAOs/newsDAO.js"

export default class NewsController{
    static async apiGetNews(req, res, next){
        const newsPerPage = req.query.playersPerPage ? parseInt(req.query.newsPerPage, 10) : 20
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

    static async apiPostNewsItem(req, res, next){
        try{
            const text = req.body.text
            const date = new Date()

            const newsResponse = await NewsDAO.addNewsItem(
                text,
                date,
            )

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.messsage})
        }
    }

    static async apiUpdateNewsItem(req, res, next){
        try{
            const newsId = req.body.newsId
            const text = req.body.text
            const date = new Date()

            const newsResponse = await NewsDAO.updateNewsItem(
                newsId,
                text,
                date,
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