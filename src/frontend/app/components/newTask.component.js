import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import ProyectService from '../services/proyect.service';

@Component({
	selector: 'newTask',
	inputs: [ 'epic' ],
	template: `
		<form>
			<input [(ngModel)]="data.description" placeholder="Crear" name="description">
			<button type="button" (click)="onSubmit()">+</button>
		<form>`
})

export default class NewTaskComponent {
	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	onSubmit() {
		this.proyectService.createTask(this.proyect, this.milestone, this.epic, this.data)
		this.data = {}
	}

	ngOnInit() {
		this.data = {}
		this.proyect = {}
		this.milestone = {}
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
		});
	}
}

NewTaskComponent.parameters = [
	ActivatedRoute, ProyectService
]
