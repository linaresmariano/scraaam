import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import ProyectService from '../services/proyect.service'

@Component({
	selector: 'taskList',
	inputs: [ 'epic' ],
	template: `
		<h2>Tasks</h2>
		<ul>
			<li *ngFor="let item of epic.tasks">
				<a [routerLink]="['/proyects', proyect._id, 'milestones', milestone._id, 'epics', epic._id, 'tasks', item._id]">
					{{item.description}}
				</a>
			</li>
		</ul>
		<newTask [epic]="epic"></newTask>`
})

export default class TaskListComponent {
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

TaskListComponent.parameters = [
	ActivatedRoute, ProyectService
]
