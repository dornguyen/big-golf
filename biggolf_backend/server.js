import express from "express"
import cors from "cors"
import players from "./api/routes/players.route.js"
import tournaments from "./api/routes/tournaments.route.js"
import course_scorecards from "./api/routes/courseScorecards.route.js"
import player_scorecards from "./api/routes/playerScorecards.route.js"
import news from "./api/routes/news.route.js"
import emails from "./api/routes/emails.route.js"
import accounts from "./api/routes/accounts.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/players", players)
app.use("/api/v1/tournaments", tournaments)
app.use("/api/v1/course_scorecards", course_scorecards)
app.use("/api/v1/player_scorecards", player_scorecards)
app.use("/api/v1/news", news)
app.use("/api/v1/emails", emails)
app.use("/api/v1/accounts", accounts)

app.use("*", (req, res) => res.status(404).json({error: "Not Found"}))


export default app