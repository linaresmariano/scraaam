import { Component } from '@angular/core';
import { Router } from '@angular/router';

import ProyectService from '../services/proyect.service';

@Component({
	selector: 'newProyect',
	template: `<route-modal [cancelUrl]="['/']">
								<modal-header>
										<h3>Crear proyecto</h3>
								</modal-header>
								<modal-content>
									Nombre:
									<input [(ngModel)]="data.name" placeholder="Nombre" name="name">
								</modal-content>
								<modal-footer>
									<button class="btn btn-success" (click)="onSubmit()">Aceptar</button>
									<button class="btn btn-danger" [routerLink]="['/']">Cancelar</button>
								</modal-footer>
						</route-modal>`
})

export default class NewProyectComponent {
	constructor(router, proyectService) {
		this.data = {}
		this.router = router
		this.proyectService = proyectService
	}

	onSubmit() {
		this.proyectService.create(this.data)
		console.log(this.data)
		
		this.router.navigate(['/proyects', this.proyectService.proyects[this.proyectService.proyects.length-1]._id])
	}
}

NewProyectComponent.parameters = [
	Router, ProyectService
]
