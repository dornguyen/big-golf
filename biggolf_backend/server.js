import express from "express"
import cors from "cors"
import players from "./api/players.route.js"
import tournaments from "./api/tournaments.route.js"
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/players", players)
app.use("/api/v1/tournaments", tournaments)
app.use("*", (req, res) => res.status(404).json({error: "Not Found"}))


export default app