import {
    getPlanDB,
    modificarPlanDB
} from "../database/DAOActividad.js"; //database methods

export const getPlan = async (req, res) => {
    const plan = await getPlanDB()
    res.json(plan)
}

export const putPlan = async (req, res) => {
    const plan = await modificarPlanDB(req.body)
    res.json(plan)
}