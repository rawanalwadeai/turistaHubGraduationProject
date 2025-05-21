import express from "express"
import {getAllResults} from './../controllers/searchController.js'

const router = express.Router()


router.get('/getAllResults', getAllResults);


export default router