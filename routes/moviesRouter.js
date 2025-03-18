import express from 'express'

const router = express.Router()
import {index, show, destroy, update} from '../controllers/moviesController.js'

import ImagePathMiddleware from '../middlewares/imagePath.js'



router.get( '/', index)



router.get('/:id', show)



router.delete('/:id', destroy)



router.patch('/:id', update)


export default router

