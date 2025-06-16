import express from 'express'
import { createTranslator ,updateTranslator , deleteTranslator ,getAllTranslators , getSingleTranslator ,getTopRatedTranslators , getTranslatorsBySearch, getTranslatorCount } from "../controllers/translatorController.js";

const router = express.Router()




router.post('/', createTranslator)                
router.put('/:id', updateTranslator)                
router.delete('/:id', deleteTranslator)             
router.get('/:id', getSingleTranslator)             
router.get('/', getAllTranslators)                  
router.get('/search/by-filter', getTranslatorsBySearch) 
// router.get('/featured/top-rated', getTopRatedTranslators) 
router.get('/count/total', getTranslatorCount)     


export default router