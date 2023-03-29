import express from 'express'

import { getQuizs,getQuiz,createQuiz } from './database'

const app = express()

app.get("/quizs",async (req, res) => {
    const quizs = await getQuizs()
    res.send(quizs)
})

app.get("/quizs/:id", async(req,res) =>{
    const id = req.params.id
    const quizs = await getQuizs(id)
    res.send(quizs)
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () =>{
    console.log('Server is running on port 8080')
})