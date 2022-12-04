import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let news

export default class NewsDAO{
    static async injectDB(conn){
        if(news){
            return
        }
        try{
            console.log("Start loading news...")
            const database = await conn.db(process.env.RESTBIGGOLF_NS)
            news = database.collection("news")
            console.log("Finished loading news!")
        } catch(e){
            console.error(
                `Unable to establish a connection handle in newsDAO: ${e}`,
            )
        }
    }

    static async getNews({
        filters = null,
        page = 0,
        newsPerPage = 20,
    } = {}) {
        let query
        if(filters){
            if("newsId" in filters){
                query = {$text: {$search: filters["newsId"]}}
            } 
        }

        let cursor
        try{
            cursor = await news
                .find(query)
        } catch(e){
            console.error(`Unable to issue find commnad, ${e}`)
            return {newsList: [], totalNumNews: 0}
        }

        const displayCursor = cursor.limit(newsPerPage).skip(newsPerPage * page)
        
        try{
            const newsList = await displayCursor.toArray()
            const totalNumNews = await news.countDocuments(query)

            return {newsList, totalNumNews}
        } catch(e){
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return {newsList: [], totalNumNews: 0}
        }
    }

    static async getNewsItemById(id){
        try{
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
            ]
            return await news.aggregate(pipeline).next()
        } catch(e){
            console.error(`Something went wrong in getNewsItemById: ${e}`)
            throw e
        }
    }

    static async addNewsItem(news_month, news_day, news_year, news_subject, news_description){
        try{
            const newsDoc = {
                month: news_month,
                day: news_day,
                year: news_year,
                subject: news_subject,
                description: news_description,
            }
            return await news.insertOne(newsDoc)
        } catch(e){
            console.error(`Unable to post news item: ${e}`)
            return {error: e}
        }
    }

    static async updateNewsItem(n_id, n_month, n_day, n_year, n_subject, n_description){
        try{
            const updateResponse = await news.updateOne(
                {_id: ObjectId(n_id)},
                {$set: {month: n_month, day: n_day, year: n_year, subject: n_subject, description: n_description}},
            )
            return updateResponse
        } catch(e){
            console.error(`Unable to update player scorecard: ${e}`)
            return {error: e}
        }
    }

    static async deleteNewsItem(n_id){
        try{
            const newsResponse = await news.deleteOne({
                _id: ObjectId(n_id),
            })

            return newsResponse
        } catch(e){
            console.error(`Unable to delete news item: ${e}`)
            return {error: e}
        }
    }
}