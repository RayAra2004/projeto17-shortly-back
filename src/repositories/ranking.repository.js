import { db } from "../database/database.connection.js";

export function getRanking(){
    return db.query(`
            SELECT person.id, person.name, count(link.fk_person_id) as "linksCount", sum(link."visitCount") as "visitCount"
            FROM person
            LEFT JOIN link 
            ON person.id = link.fk_person_id
            GROUP BY person.id
            ORDER BY "visitCount" desc
            LIMIT 10 OFFSET 0;
        `)
}