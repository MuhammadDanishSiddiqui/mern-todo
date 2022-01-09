

var cors = require('cors')
const express = require("express")
const app = express()
const path = require("path")
const userRouter = require("./routes/user")
const taskRouter = require("./routes/tasks")
const dotenv = require("dotenv")
dotenv.config()
require("./db/conn")

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const staticPath = path.join(__dirname, "../client/build")


if (process.env.NODE_ENV == "production") {
    app.use(express.static(staticPath));
    app.get("*", (req, res) => {
        res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"))
    })
}

app.listen(port, () => {
    console.log("listening to port no " + port)
})
