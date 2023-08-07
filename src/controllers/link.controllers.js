import { nanoid } from "nanoid"
import { createShorten, getUrlDB, getUrlByUrlShorten, updateVisitCount, getUrlById, deleteUrlById } from "../repositories/link.repository.js"

export async function shorten(req, res){

    const { url } = req.body
    const { user } = res.locals
    const urlShorten = nanoid(10)

    try{
        const result = await createShorten(url, urlShorten, user)

        res.status(201).send(result.rows[0])
    }catch(err){
        res.status(500).send(err.message)
    }   
}

export async function getUrl(req, res){
    const { id } = req.params

    try{
        const url = await getUrlDB(id)

        if(url.rowCount === 0) return res.status(404).send("URL não encontrada. Verifique o id!!!")

        res.send(url.rows[0])

    }catch(err){
        res.status(500).send(err.message)
    } 
}

export async function openUrl(req, res){
    const { shortUrl } = req.params

    try{
        const urlExist = await getUrlByUrlShorten(shortUrl)
   
        if(urlExist.rowCount === 0) return res.status(404).send("URL não encotrada, verifique se está correta!!!")

        updateVisitCount(urlExist)

        res.redirect(`${urlExist.rows[0].url}`)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function deleteUrl(req, res){
    const { id } = req.params
    const { user } = res.locals

    try{
        const urlExist = await getUrlById(id)

        if(urlExist.rowCount === 0) return res.status(404).send("URL não encontrada!!")
        if(urlExist.rows[0].fk_person_id !== user) return res.status(401).send("Você não tem permissão pra excluir esta URL!!!")

        deleteUrlById(id)

        res.sendStatus(204)

    }catch(err){
        res.status(500).send(err.message)
    }
}