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

		get proyects() {
			return this._proyects;
		}

		get proyect() {
			return this._proyect;
		}

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

		create(proyect) {
			this.http.post("/proyects", JSON.stringify(proyect), { headers:{'Content-Type': 'application/json'}})
							.toPromise()
							.then(response => this._proyects.push(proyect))
							.catch(err => console.log(err))
		}

		createMilestone(proyect, milestone) {
			this.http.post(`/proyects/${proyect._id}/milestones`, JSON.stringify(milestone), { headers:{'Content-Type': 'application/json'}})
							.toPromise()
							.then(response => proyect.milestones.push(milestone))
							.catch(err => console.log(err))
		}

		createEpic(proyect, milestone, epic) {
			this.http.post(`/proyects/${proyect._id}/milestones/${milestone._id}/epics`, JSON.stringify(epic), { headers:{'Content-Type': 'application/json'}})
							.toPromise()
							.then(response => milestone.epics.push(epic))
							.catch(err => console.log(err))
		}

		createComment(proyect, milestone, epic, comment) {
			this.http.post(`/proyects/${proyect._id}/milestones/${milestone._id}/epics/${epic._id}/comments`,
				JSON.stringify(comment), { headers:{'Content-Type': 'application/json'}})
							.toPromise()
							.then(response => epic.comments.push(comment))
							.catch(err => console.log(err))
		}

}

ProyectService.parameters = [
	Http
]
