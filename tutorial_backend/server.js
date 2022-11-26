import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)
// someone goes to a route that does not exist.
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app