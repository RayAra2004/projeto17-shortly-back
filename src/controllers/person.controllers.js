import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

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