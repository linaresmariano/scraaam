import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProyectService from "../services/proyect.service"

@Component({
	selector: 'milestoneDetail',
	template: `
		<milestone></milestone>
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
