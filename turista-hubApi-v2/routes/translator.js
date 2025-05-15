import express from 'express'
import { createTranslator ,updateTranslator , deleteTranslator ,getAllTranslators , getSingleTranslator ,getTopRatedTranslators , getTranslatorsBySearch, getTranslatorCount } from "../controllers/translatorController.js";

const router = express.Router()




router.post('/', createTranslator)                  // Create new translator
router.put('/:id', updateTranslator)                // Update translator
router.delete('/:id', deleteTranslator)             // Delete translator
router.get('/:id', getSingleTranslator)             // Get single translator
router.get('/', getAllTranslators)                  // Get all translators (with pagination)
router.get('/search/by-filter', getTranslatorsBySearch)  // Search translators
// router.get('/featured/top-rated', getTopRatedTranslators) // Top rated translators
router.get('/count/total', getTranslatorCount)      // Count all translators


export default router