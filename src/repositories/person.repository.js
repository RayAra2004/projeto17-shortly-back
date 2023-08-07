import { db } from "../database/database.connection.js";

export function createPerson(name, email, encriptedPassword){
    db.query("INSERT INTO person (name, email, password) VALUES($1, $2, $3);", [name.trim(), email.trim(), encriptedPassword])
}

export function getUserByEmail(email){
    return db.query(`SELECT * FROM person WHERE email = $1;`, [email.trim()])
}

export function createSession(token, user){
    db.query(`INSERT INTO session (token, fk_person_id) VALUES($1, $2);`, [token, user.rows[0].id])
}