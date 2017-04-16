import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProyectService from "../services/proyect.service"

@Component({
  selector: 'milestone',
  template: `
    <h2>{{milestone.name}}</h2>
    <h4>{{milestone.epics ? milestone.epics.length : 0}} Epics - {{milestone.tasks}} Tasks

    <epicList></epicList>
  `
})
export default class MilestoneComponent {

  constructor(route, proyectService) {
    this.route = route
    this.proyectService = proyectService
  }

  ngOnInit() {
    this.milestone = {}
    this.proyect = {}
    this.route.params.subscribe(params => {
      this.proyectService.getMilestone(params.proyect, params.milestone)
          .then(mile => this.milestone = mile)
          .catch(e => console.log(e));
    });
  }

}

MilestoneComponent.parameters = [
  ActivatedRoute, ProyectService
]
