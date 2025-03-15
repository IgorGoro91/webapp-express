import express from 'express'

const router = express.Router()
import {index, show, destroy} from '../controllers/moviesController.js'




router.get( '/', index)



router.get('/:id', show)



router.delete('/:id', destroy)


export default router

