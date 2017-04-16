import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProyectService from "../services/proyect.service"

@Component({
	selector: 'epicDetail',
	template: `
		<h2>{{epic.description}}</h2>
	`
})

export default class EpicDetailComponent {

	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	ngOnInit() {
		this.milestone = {}
		this.proyect = {}
		this.epic = {}
		this.route.params.subscribe(params => {
			this.proyectService.getProyect(params.proyect)
					.then(proy => this.proyect = proy)
					.catch(e => console.log(e));

			this.proyectService.getMilestone(params.proyect, params.milestone)
					.then(mile => this.milestone = mile)
					.catch(e => console.log(e));

			this.proyectService.getEpic(params.proyect, params.milestone, params.epic)
					.then(epic => this.epic = epic)
					.catch(e => console.log(e));
		})
	}
}

EpicDetailComponent.parameters = [
	ActivatedRoute, ProyectService
]
