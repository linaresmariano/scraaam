import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProyectService from "../services/proyect.service"

@Component({
	selector: 'milestoneDetail',
	// inputs: [ 'milestone' ],
	template: `
		<h2>{{milestone.name}}</h2>
		<h4>{{milestone.epics ? milestone.epics.length : 0}} Epics - {{milestone.tasks}} Tasks

		<epicList></epicList>

		<button class="btn btn-primary" [routerLink]="['../../']">Volver</button>
	`
})
export default class MilestoneDetailComponent {

	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	ngOnInit() {
		this.milestone = {}
		this.proyect = {}
		this.route.params.subscribe(params => {
			this.proyectService.getMilestone(params.proyect, params.milestone)
					.then(mile => this.milestone = mile)
					.catch(e => console.log(e));
		});
	}

}

MilestoneDetailComponent.parameters = [
	ActivatedRoute, ProyectService
]
