import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import ProyectService from '../services/proyect.service';

@Component({
	selector: 'newEpic',
	inputs: [ 'milestone' ],
	template: `<form>
					<input [(ngModel)]="data.description" placeholder="Crear" name="description">
					<button type="button" (click)="onSubmit()">+</button>
			<form>`
})

export default class NewEpicComponent {
	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	onSubmit() {
		this.proyectService.createEpic(this.proyect, this.milestone, this.data)
		this.data = {}
	}

	ngOnInit() {
		this.data = {}
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

NewEpicComponent.parameters = [
	ActivatedRoute, ProyectService
]
