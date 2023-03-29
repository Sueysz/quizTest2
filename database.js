import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getQuizs(){
const [rows] = await pool.query("SELECT * FROM quiz")
    return rows
}

export async function getQuiz(id){
    const [rows] = await pool.query(`
    SELECT *
    FROM quiz
    WHERE id = ?
    `, [id])
    return rows [0]
}

export async function createQuiz(title,description,question) {
    const [result] = await pool.query(`
    INSERT INTO quiz (title, description,question)
    VALUES (?,?,?)
    `, [title, description,question])
    const id = result.insertId
    return getQuiz(id)
}

const result = await createQuiz('test','test','test') 
console.log(result)