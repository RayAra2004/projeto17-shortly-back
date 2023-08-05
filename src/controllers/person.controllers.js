import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

export async function signUp(req, res){
    const {name, email, password, confirmPassword} = req.body;

    if(password.trim() !== confirmPassword.trim()) return res.status(422).send("O campo senha e confirmar senha devem  ser iguais");
    try{
        const encriptedPassword = bcrypt.hashSync(password.trim(), 10)
        await db.query("INSERT INTO person (name, email, password) VALUES($1, $2, $3);", [name.trim(), email.trim(), encriptedPassword])

        res.sendStatus(201)
    }catch(err){
        if(err.code === "23505") return res.status(409).send("Email já cadastrado no sistema!!!")
        res.status(500).send(err.message)
    }
}

export async function signIn(req, res){
    const {email, password} = req.body;

    try{
        const user = await db.query(`SELECT * FROM person WHERE email = $1;`, [email.trim()])

        if(user.rowCount === 0)return res.status(401).send("Email não cadastrado no sistema!!")

        if(!(bcrypt.compareSync(password.trim(), user.rows[0].password))) return res.status(401).send("Senha incorreta!!")

        const token = uuid()

        await db.query(`INSERT INTO session (token, fk_person_id) VALUES($1, $2);`, [token, user.rows[0].id])

        res.send({token})

    }catch(err){
        res.status(500).send(err.message)
    }
}