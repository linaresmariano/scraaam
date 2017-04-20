import express from 'express'

import Proyect from '../models/Proyect.js'
import Milestone from '../models/Milestone.js'
import Epic from '../models/Epic.js'
import Task from '../models/Task.js'
import Comment from '../models/Comment.js'

let router = express.Router()

const parseParam = (param, clase) => {
	router.param(param, (req, res, next, value) => {
	clase.findById(value)
		.then(saved => {
			if (!saved) throw new Error(`Object not found ${value}`)

			req[param] = saved
			next()
		})
		.catch(next)
	})
}

//Express parameters
parseParam('proyect', Proyect)
parseParam('milestone', Milestone)
parseParam('epic', Epic)


// Express routes
router.get('/proyects', (req, res, next) => {
	Proyect.find()
		.then(proyects => res.json(proyects))
		.catch(next)
})

router.post('/proyects', (req, res, next) => {
	const proyect = new Proyect(req.body)

	proyect.save()
		.then(savedProyect => res.json(savedProyect))
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
	req.epic.populate('tasks comments').execPopulate()
		.then(epicCompleto => res.json(epicCompleto))
		.catch(next)
})

router.post('/proyects/:proyect/milestones/:milestone/epics/:epic/tasks', (req, res, next) => {
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

router.post('/proyects/:proyect/milestones/:milestone/epics/:epic/comments', (req, res, next) => {
	const epic = req.epic
	let com = new Comment(req.body)
	com.epic = epic

	com.save()
		.then(comGuardado => {
			com = comGuardado
			epic.comments.push(com)
			return epic.save()
		})
		.then(epicGuardado => res.json(com))
		.catch(next)
})

export default router
