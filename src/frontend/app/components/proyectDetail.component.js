import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProyectService from "../services/proyect.service"

@Component({
	selector: 'proyectDetail',
	template: `
		<div class="container-fluid">
			<div class="row-fluid">

				<div class="col-lg-6">
					<milestoneList [proyect]="proyect"></milestoneList>
				</div>
			</div>
		</div>
	`
})
export default class ProyectDetailComponent {

	constructor(route, proyectService) {
		this.route = route
		this.proyectService = proyectService
	}

	ngOnInit() {
		this.proyect = {}
		this.route.params.subscribe(params => {
			this.proyectService.getProyect(params.id)
					.then(proyect => {
						this.proyect = proyect
						this.proyectService._proyect = proyect
					})
					.catch(e => console.log(e));
		});
	}

}

ProyectDetailComponent.parameters = [
	ActivatedRoute, ProyectService
]
