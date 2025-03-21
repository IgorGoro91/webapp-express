import express from 'express'

import upload from '../middlewares/multer.js'

const router = express.Router()
import {index, show, destroy, update, storeRewiew, store} from '../controllers/moviesController.js'

import ImagePathMiddleware from '../middlewares/imagePath.js'


//localhost:5000/movies
router.get( '/', index)


//localhost:5000/movies/:id
router.get('/:id', show)


//localhost:5000/movies/:id
router.delete('/:id', destroy)


//localhost:5000/movies/:id
router.patch('/:id', update)


//localhost:5000/movies/:id/reviews
router.post( '/:id/reviews', storeRewiew)


//localhost:5000/movies
router.post('/', upload.single('image'), store)


export default router

