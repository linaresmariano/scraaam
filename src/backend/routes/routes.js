import express from 'express'

import Post from '../models/Post.js'
import Comment from '../models/Comment.js'
import Proyect from '../models/Proyect.js'
import Milestone from '../models/Milestone.js'
import Epic from '../models/Epic.js'
import Task from '../models/Task.js'

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

router.param('milestone', (req, res, next, value) => {
	Milestone.findById(value)
		.then(milestone => {
			if (!milestone) {
				throw new Error(`Milestone no encontrado ${value}`)
			}

			req.milestone = milestone
			next()
		})
		.catch(next)
})

router.param('epic', (req, res, next, value) => {
	Epic.findById(value)
		.then(epic => {
			if (!epic) {
				throw new Error(`Epic no encontrado ${value}`)
			}

			req.epic = epic
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

router.get('/proyects/:proyect/milestones/:milestone', (req, res, next) => {
	req.milestone.populate('epics').execPopulate()
		.then(milestoneCompleto => res.json(milestoneCompleto))
		.catch(next)
})

router.post('/proyects/:proyect/milestones/:milestone/epics', (req, res, next) => {
	const proyecto = req.proyect
	const milestone = req.milestone
	let ep = new Epic(req.body)
	ep.milestone = milestone

	ep.save()
		.then(epicGuardado => {
			ep = epicGuardado
			milestone.epics.push(ep)
			return milestone.save()
		})
		.then(milestoneGuardado => res.json(ep))
		.catch(next)
})

router.get('/proyects/:proyect/milestones/:milestone/epics/:epic', (req, res, next) => {
	req.epic.populate('tasks').execPopulate()
		.then(epicCompleto => res.json(epicCompleto))
		.catch(next)
})

router.post('/proyects/:proyect/milestones/:milestone/epics/:epic/task', (req, res, next) => {
	const proyecto = req.proyect
	const milestone = req.milestone
	const epic = req.epic
	let task = new Task(req.body)
	task.epic = epic

	task.save()
		.then(taskGuardado => {
			task = taskGuardado
			epic.tasks.push(task)
			return epic.save()
		})
		.then(epicGuardado => res.json(task))
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
