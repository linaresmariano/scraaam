import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import ProyectService from '../services/proyect.service';

@Component({
	selector: 'newMilestone',
	inputs: [ 'proyect' ],
	template: `<form>
								<input [(ngModel)]="data.name" placeholder="Crear" name="name">
								<button type="button" (click)="onSubmit()">+</button>
						 <form>`
})

export default class NewMilestoneComponent {
	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	onSubmit() {
		this.proyectService.createMilestone(this.proyect, this.data)
		console.log(this.data)
		console.log(this.proyect.name)
		this.data = {}
	}

	ngOnInit() {
		this.data = {}
		this.proyect = {}
		this.route.params.subscribe(params => {
			this.proyectService.getProyect(params.id)
					.then(proy => this.proyect = proy)
					.catch(e => console.log(e));
		});
	}
}

NewMilestoneComponent.parameters = [
	ActivatedRoute, ProyectService
]
