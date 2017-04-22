import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class ProyectService {

	constructor(http) {
		this.http = http
		this._proyects = []
		this._proyect = {}
		this.http.get("/proyects").toPromise()
						.then(response => this._proyects.push(...response.json()))
						.catch(err => console.log(err))
	}

	get proyects() { return this._proyects }
	get proyect() { return this._proyect }

	getProyect(id) {
		return this.http.get(`/proyects/${id}`).toPromise()
						.then(response => response.json());
	}

	getMilestone(proyect, milestone) {
		return this.http.get(`/proyects/${proyect}/milestones/${milestone}`).toPromise()
						.then(response => response.json());
	}

	getEpic(proyect, milestone, epic) {
		return this.http.get(`/proyects/${proyect}/milestones/${milestone}/epics/${epic}`).toPromise()
						.then(response => response.json());
	}

	getTask(proyect, milestone, epic, task) {
		console.log(`/proyects/${proyect}/milestones/${milestone}/epics/${epic}/tasks/${task}`)
		return this.http.get(`/proyects/${proyect}/milestones/${milestone}/epics/${epic}/tasks/${task}`).toPromise()
						.then(response => response.json());
	}

	postAndPushResponse(url, objToPost, arrayToPush) {
		this.http.post(url, JSON.stringify(objToPost), { headers:{'Content-Type': 'application/json'}}).toPromise()
			.then(response => arrayToPush.push(response.json()))
			.catch(err => console.log(err))
	}

	getPostUrl(proyect, milestone, epic, task, comment) {
		if(!milestone) return `/proyects`
		if(!epic) return	`/proyects/${proyect._id}/milestones`
		if(!task && !comment) return `/proyects/${proyect._id}/milestones/${milestone._id}/epics`
		if(!comment) return `/proyects/${proyect._id}/milestones/${milestone._id}/epics/${epic._id}/tasks`
		if(!task)    return `/proyects/${proyect._id}/milestones/${milestone._id}/epics/${epic._id}/comments`
	}

	create(proyect) {
		this.postAndPushResponse(this.getPostUrl(proyect), proyect, this._proyects)
	}

	createMilestone(proyect, milestone) {
		this.postAndPushResponse(this.getPostUrl(proyect, milestone), milestone, proyect.milestones)
	}

	createEpic(proyect, milestone, epic) {
		this.postAndPushResponse(this.getPostUrl(proyect, milestone, epic), epic, milestone.epics)
	}

	createComment(proyect, milestone, epic, comment) {
		this.postAndPushResponse(this.getPostUrl(proyect, milestone, epic, undefined, comment), comment, epic.comments)
	}

	createTask(proyect, milestone, epic, task) {
		this.postAndPushResponse(this.getPostUrl(proyect, milestone, epic, task), task, epic.tasks)
	}

}

ProyectService.parameters = [
	Http
]
