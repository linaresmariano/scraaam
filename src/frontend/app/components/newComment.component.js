import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import ProyectService from '../services/proyect.service';

@Component({
	selector: 'newComment',
	inputs: [ 'epic' ],
	template: `
		<form>
			Comentar <input [(ngModel)]="data.body" placeholder="Crear" name="body">
			<button type="button" (click)="onSubmit()">+</button>
		<form>`
})

export default class NewCommentComponent {
	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	onSubmit() {
		this.proyectService.createComment(this.proyect, this.milestone, this.epic, this.data)
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

NewCommentComponent.parameters = [
	ActivatedRoute, ProyectService
]
