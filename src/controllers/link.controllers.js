import { nanoid } from "nanoid"
import { db } from "../database/database.connection.js"

export async function shorten(req, res){

    const { url } = req.body
    const { user } = res.locals
    const urlShorten = nanoid(10)

    try{
        const result = await db.query(`INSERT INTO link(url, "shortUrl", fk_person_id) VALUES ($1, $2, $3) RETURNING id, "shortUrl";`, [url, urlShorten, user])

        res.status(201).send(result.rows[0])
    }catch(err){
        res.status(500).send(err.message)
    }   
}

export async function getUrl(req, res){
    const { id } = req.params

    try{
        const url = await db.query(`SELECT id, "shortUrl", url FROM link WHERE id = $1;`, [id])

        if(url.rowCount === 0) return res.status(404).send("URL não encontrada. Verifique o id!!!")

        res.send(url.rows[0])

    }catch(err){
        res.status(500).send(err.message)
    } 
}

export async function openUrl(req, res){
    const { shortUrl } = req.params

    try{
        const urlExist = await db.query(`SELECT * FROM link WHERE "shortUrl" = $1;`, [shortUrl])

        if(urlExist.rowCount === 0) return res.status(404).send("URL não encotrada, verifique se está correta!!!")

        await db.query(`UPDATE link set "visitCount" = $1 WHERE id = $2;`, [Number(urlExist.rows[0].visitCount) + 1, urlExist.rows[0].id])

        res.redirect(`${urlExist.rows[0].url}`)
    }catch(err){
        res.status(500).send(err.message)
    }
}