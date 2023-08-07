import { db } from "../database/database.connection.js";

export function getUserById(user){
    return db.query(`
            SELECT person.id, person.name, sum(link."visitCount") as "visitCountTotal", to_json(link.*) "shortenedUrls"
            FROM person
            INNER JOIN link ON person.id = link.fk_person_id
            WHERE person.id = $1
            GROUP BY person.id, link.id
        `, [user])
}