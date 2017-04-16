import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import ProyectService from '../services/proyect.service'

@Component({
	selector: 'epicList',
	inputs: [ 'milestone' ],
	template: `
		<h2>Epics</h2>
		<ul>
			<li *ngFor="let item of milestone.epics">
				<a [routerLink]="['/proyects', proyect._id, 'milestones', milestone._id, 'epics', item._id]">
					{{item.description}}
				</a>
			</li>
		</ul>
		<newEpic [milestone]="milestone"></newEpic>`
})

export default class EpicListComponent {
	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	ngOnInit() {
		this.proyect = {}
		this.milestone = {}
		this.route.params.subscribe(params => {
			this.proyectService.getProyect(params.proyect)
					.then(proy => this.proyect = proy)
					.catch(e => console.log(e));

			this.proyectService.getMilestone(params.proyect, params.milestone)
					.then(mile => this.milestone = mile)
					.catch(e => console.log(e));
		});

	}
}

EpicListComponent.parameters = [
	ActivatedRoute, ProyectService
]
