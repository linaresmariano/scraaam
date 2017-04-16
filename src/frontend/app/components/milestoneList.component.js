import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import ProyectService from '../services/proyect.service'

@Component({
	selector: 'milestoneList',
	inputs: [ 'proyect' ],
	template: `
		<h1>Milestones</h1>
		<ul>
			<li *ngFor="let item of proyect.milestones">
				<a [routerLink]="['/proyects', proyect._id, 'milestones', item._id]">{{item.name}}</a>
			</li>
		</ul>
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
