import express from 'express'
import dotenv from 'dotenv'
import UserRouter from './CONTROOLER/users.controll.js'


dotenv.config()
const app = express()
app.use(express.json())
app.use(UserRouter)




app.listen(process.env.PORT, () => {
    console.log(`server is working on ${process.env.PORT}`);

})