import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class ProyectService {

    constructor(http) {
      this.http = http
      this._proyects = []
      this.http.get("/proyects").toPromise()
              .then(response => this._proyects.push(...response.json()))
              .catch(err => console.log(err))
    }

    get proyects() {
      return this._proyects;
    }

    getProyect(id) {
      return this.http.get(`/proyects/${id}`).toPromise()
              .then(response => response.json());
    }

    create(proyect) {
      this.http.post("/proyects", JSON.stringify(proyect), { headers:{'Content-Type': 'application/json'}})
              .toPromise()
              .then(response => this._proyects.push(proyect))
              .catch(err => console.log(err))
    }

    createMilestone(proyect, milestone) {
      this.http.post(`/proyects/${proyect._id}/milestones`, JSON.stringify(milestone), { headers:{'Content-Type': 'application/json'}})
              .toPromise()
              .then(response => proyect.milestones.push(milestone))
              .catch(err => console.log(err))
    }
}

ProyectService.parameters = [
  Http
]