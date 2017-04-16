import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class PostService {

    constructor(http) {
      this.http = http
      this._posts = []
      this.http.get("/noticias").toPromise()
              .then(response => this._posts.push(...response.json()))
              .catch(err => console.log(err))
    }

    get posts() {
      return this._posts;
    }

    getPost(id) {
      return this.http.get(`/noticias/${id}`).toPromise()
              .then(response => response.json());
    }

    create(post) {
      this.http.post("/noticias", JSON.stringify(post), { headers:{'Content-Type': 'application/json'}})
              .toPromise()
              .then(response => this._posts.push(post))
              .catch(err => console.log(err))
    }
}

PostService.parameters = [
  Http
]
