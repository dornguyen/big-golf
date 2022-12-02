import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import PlayersDAO from "./DAOs/playersDAO.js"
import TournamentsDAO from "./DAOs/tournamentsDAO.js"
import CourseScorecardsDAO from "./DAOs/courseScorecardsDAO.js"
import PlayerScorecardsDAO from "./DAOs/playerScorecardsDAO.js"
import NewsDAO from "./DAOs/newsDAO.js"
import EmailsDAO from "./DAOs/emailsDAO.js"
import AccountsDAO from "./DAOs/accountsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTBIGGOLF_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true}
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await PlayersDAO.injectDB(client)
        await TournamentsDAO.injectDB(client)
        await CourseScorecardsDAO.injectDB(client)
        await PlayerScorecardsDAO.injectDB(client)
        await NewsDAO.injectDB(client)
        await EmailsDAO.injectDB(client)
        await AccountsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })