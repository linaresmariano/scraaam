import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProyectService from "../services/proyect.service"

@Component({
	selector: 'epicDetail',
	template: `
		<div class="container-fluid">
			<div class="row-fluid">

				<div class="col-lg-6">
					<h1>{{epic.description}}</h1>

					<div class="well">
						<h4>Comentarios</h4>
						<div class="well">
						<comment *ngFor="let comment of epic.comments" [data]="comment"></comment>
						<newComment [epic]="epic"></newComment>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<taskList [epic]="epic"></taskList>
				</div>
			</div>
		</div>
	`
})

export default class EpicDetailComponent {

	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	ngOnInit() {
		this.milestone = {}
		this.proyect = {}
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
		})
	}
}

EpicDetailComponent.parameters = [
	ActivatedRoute, ProyectService
]
