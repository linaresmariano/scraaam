import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import ProyectService from '../services/proyect.service'

@Component({
	selector: 'milestoneList',
	inputs: [ 'proyect' ],
	template: `
		<h1>Milestones</h1>
		<div *ngFor="let item of proyect.milestones" [routerLink]="['/noticia', item._id]">{{item.name}}</div>
		<newMilestone [proyect]="proyect"></newMilestone>`
})

export default class MilestoneListComponent {
	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	ngOnInit() {
		this.proyect = {}
		this.route.params.subscribe(params => {
			this.proyectService.getProyect(params.id)
					.then(proyect => this.proyect = proyect)
					.catch(e => console.log(e));
		});
	}
}

MilestoneListComponent.parameters = [
	ActivatedRoute, ProyectService
]
