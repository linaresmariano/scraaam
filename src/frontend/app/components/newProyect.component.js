import { Component } from '@angular/core';

import ProyectService from '../services/proyect.service';

@Component({
  selector: 'newProyect',
  template: `<form>
                Crear proyecto:
                <input [(ngModel)]="data.name" placeholder="Nombre" name="name">
                <button type="button" (click)="onSubmit()">Aceptar</button>
                <a [routerLink]="['/']">Cancelar</a>
             <form>`
})

export default class NewProyectComponent {
  constructor(proyectService) {
    this.data = {}
    this.proyectService = proyectService
  }

  onSubmit() {
    this.proyectService.create(this.data)
    this.data = {}
  }
}

NewProyectComponent.parameters = [
  ProyectService
]
