import { Component } from '@angular/core';

import ProyectService from '../services/proyect.service';
import content from './app.component.html';

@Component({
  selector: 'app-view',
  template: content,
  providers: [ ProyectService ]
})

export default class AppComponent {
  constructor(proyectService) {
    this.name = 'Scraaam'
    this.proyects = proyectService.proyects
  }
}

AppComponent.parameters = [
  ProyectService
]
