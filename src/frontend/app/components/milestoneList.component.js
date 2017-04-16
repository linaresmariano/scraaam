import { Component } from '@angular/core';

import ProyectService from '../services/proyect.service';

@Component({
  selector: 'milestoneList',
  template: `
    <h1>Milestones</h1>
    <div *ngFor="let item of milestones" [data]="item" [routerLink]="['/noticia', item._id]">{{item.name}}</div>
    <newPost></newPost>`
})

export default class MilestoneListComponent {
  constructor(proyectService) {
    this.milestones = proyectService.proyects;
  }
}

MilestoneListComponent.parameters = [
  ProyectService
]
