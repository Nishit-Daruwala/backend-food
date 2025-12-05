import {db} from '../config/db.js';

export const getAllFoods = async (req, res) =>{
    try{
        const [foods] = await db.query('SELECT * FROM foods ORDER BY id');
        res.json(foods);
    }catch(error){
        console.log("FOOD FETCH ERROR >", error);
        res.status(500).json({message: 'Server Error'});
    }
}
