import { db } from "../database/database.connection.js"

export function createShorten(url, urlShorten, user){
    return db.query(`INSERT INTO link(url, "shortUrl", fk_person_id) VALUES ($1, $2, $3) RETURNING id, "shortUrl";`, [url, urlShorten, user])
}

export function getUrlDB(id){
    return db.query(`SELECT id, "shortUrl", url FROM link WHERE id = $1;`, [id])
}

export function getUrlByUrlShorten(shortUrl){
    
    return db.query(`SELECT * FROM link WHERE "shortUrl" = $1;`, [shortUrl])
}

export function updateVisitCount(urlExist){
    db.query(`UPDATE link set "visitCount" = $1 WHERE id = $2;`, [Number(urlExist.rows[0].visitCount) + 1, urlExist.rows[0].id])
}

export function getUrlById(id){
    return db.query(`SELECT * FROM link WHERE id = $1;`, [id])
}

export function deleteUrlById(id){
    db.query(`DELETE FROM link WHERE id = $1;`, [id])
}