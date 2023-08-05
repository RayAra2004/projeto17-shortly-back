import { nanoid } from "nanoid"
import { db } from "../database/database.connection.js"

export async function shorten(req, res){

    const { url } = req.body
    const { user } = res.locals

    const urlShorten = nanoid(10)

    const result = await db.query(`INSERT INTO link(url, "shortUrl", fk_person_id) VALUES ($1, $2, $3) RETURNING id, "shortUrl";`, [url, urlShorten, user])

    res.status(201).send(result.rows[0])
}