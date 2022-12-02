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

    static async addNewsItem(news_text, news_date){
        try{
            const newsDoc = {
                text: news_text,
                date: news_date,
            }
            return await news.insertOne(newsDoc)
        } catch(e){
            console.error(`Unable to post news item: ${e}`)
            return {error: e}
        }
    }

    static async updateNewsItem(n_id, n_text, n_date){
        try{
            const updateResponse = await news.updateOne(
                {_id: ObjectId(n_id)},
                {$set: {text: n_text, date: n_date}},
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