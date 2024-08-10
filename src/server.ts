import mongoose from "mongoose"
import Env from "./config"
import app from "./app"

async function main() {
    try {
        await mongoose.connect(Env.database_url as string)

        app.listen(Env.port, ()=> {
            console.log(`app is listening on http://localhost:${Env.port}`)
        })
    } catch (err) {
        console.log(err)
    }
}

main()