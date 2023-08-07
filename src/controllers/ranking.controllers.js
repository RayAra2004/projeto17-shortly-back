import { getRanking } from "../repositories/ranking.repository.js"

export async function ranking(req, res){
    try{

        const data = await getRanking()

        const result = data.rows.map(d => {
            if(d.visitCount === null) d.visitCount = "0"
            return d
        })

        res.send(result)

    }catch(err){
        res.status(500).send(err.message)
    }
}