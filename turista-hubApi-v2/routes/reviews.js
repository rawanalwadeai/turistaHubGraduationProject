import express from "express"
import {createReview} from './../controllers/reviewController.js'
import { verifyUser } from "../utils/verifyToen.js"
const router = express.Router()


router.post('/:targetType/:targetId', createReview)


export default router