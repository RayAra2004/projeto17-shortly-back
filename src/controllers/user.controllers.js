import { getUserById } from "../repositories/user.repository.js";

export async function getUser(req, res){

    const { user } = res.locals

    try{
        const data = await getUserById(user)

        let visitCount = 0;

        const shortenedUrls = data.rows.map( d => {
            delete d.shortenedUrls.fk_person_id
            visitCount += Number(d.visitCountTotal)
            return d.shortenedUrls
        })

        const result = {
            id: data.rows[0].id,
            name: data.rows[0].name,
            visitCount,
            shortenedUrls
        }

        res.send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
}