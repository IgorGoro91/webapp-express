import express from "express";
import moviesRouter from './routes/moviesRouter.js'



const app = express();

import cors from 'cors'

const port = process.env.SERVER_PORT  || 5000;

app.use(cors({
    origin: process.env.FRONTEND_APP
}));


app.use(express.static('public'))

app.use(express.json() )

app.get('/', (req, res) => {
    res.send('Server Movies a posto!')
})

app.use( '/movies', moviesRouter)


app.listen(port , () =>{
    console.log(`Server Movies funziona sulla porta: ${ port }`)
})




