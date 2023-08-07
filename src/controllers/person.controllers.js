import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import { createPerson, createSession, getUserByEmail } from "../repositories/person.repository.js";

export async function signUp(req, res){
    const {name, email, password, confirmPassword} = req.body;

    if(password.trim() !== confirmPassword.trim()) return res.status(422).send("O campo senha e confirmar senha devem  ser iguais");
    try{
        const encriptedPassword = bcrypt.hashSync(password.trim(), 10)
        await createPerson(name, email, encriptedPassword)
        res.sendStatus(201)
    }catch(err){
        if(err.code === "23505") return res.status(409).send("Email já cadastrado no sistema!!!")
        res.status(500).send(err.message)
    }
}

export async function signIn(req, res){
    const {email, password} = req.body;

    try{
        const user = await getUserByEmail(email)

        if(user.rowCount === 0)return res.status(401).send("Email não cadastrado no sistema!!")

        if(!(bcrypt.compareSync(password.trim(), user.rows[0].password))) return res.status(401).send("Senha incorreta!!")

        const token = uuid()

        await createSession(token, user)

        res.send({token})

    }catch(err){
        res.status(500).send(err.message)
    }
}