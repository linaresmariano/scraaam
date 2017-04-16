import express from 'express'

import Post from '../models/Post.js'
import Comment from '../models/Comment.js'
import Proyect from '../models/Proyect.js'
import Milestone from '../models/Milestone.js'

let router = express.Router()

//Express parameters
router.param('proyect', (req, res, next, value) => {
	Proyect.findById(value)
		.then(proyect => {
			if (!proyect) {
				throw new Error(`Proyecto no encontrado ${value}`)
			}

			req.proyect = proyect
			next()
		})
		.catch(next)
})

// Express routes
router.get('/proyects', (req, res, next) => {
	Proyect.find()
		.then(proyects => res.json(proyects))
		.catch(next)
})

router.post('/proyects', (req, res, next) => {
	const proyect = new Proyect(req.body)

	proyect.save()
		.then(savedProyect => res.json(savedProyect.id))
		.catch(next)
})

router.get('/proyects/:proyect', (req, res, next) => {
	req.proyect.populate('milestones').execPopulate()
		.then(proyectoCompleto => res.json(proyectoCompleto))
		.catch(next)
})

router.post('/proyects/:proyect/milestones', (req, res, next) => {
	const proyecto = req.proyect
	let mile = new Milestone(req.body)
	mile.proyect = proyecto

	mile.save()
		.then(mileGuardado => {
			mile = mileGuardado
			proyecto.milestones.push(mile)
			return proyecto.save()
		})
		.then(proyectoGuardado => res.json(mile))
		.catch(next)
})

router.put('/noticias/:noticia/upvote', (req, res, next) => {
	const noticia = req.noticia
	noticia.upvote()

	noticia.save()
		.then(noticiaGuardada => res.json(noticiaGuardada))
		.catch(next)
})

router.post('/noticias/:noticia/comentarios', (req, res, next) => {
	const noticia = req.noticia
	let comentario = new Comment(req.body)
	comentario.post = noticia

	comentario.save()
		.then(comentarioGuardado => {
			comentario = comentarioGuardado
			noticia.comments.push(comentario)
			return noticia.save()
		})
		.then(noticiaGuardada => res.json(comentario))
		.catch(next)
})

export default router
