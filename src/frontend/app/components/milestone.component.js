import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import PostService from "../services/post.service"

@Component({
  selector: 'milestone',
  inputs: [ 'post' ],
  template: `<post [data]="post"></post>
            <button type="button" (click)="onUpvote(post)">Upvote</button>
            <h2>Comentarios:</h2>
            <comment *ngFor="let comment of post.comments" [data]="comment"></comment>
            <a [routerLink]="['/noticias']">Atras</a>`
})
export default class PostDetailComponent {

	constructor(route, postService) {
		this.route = route
		this.postService = postService
  	}

  	ngOnInit() {
      this.post = {}
      this.route.params.subscribe(params => {
        //cuando algo un parametro cambia
        this.postService.getPost(params.id)
            .then(post => this.post = post)
            .catch(e => console.log(e));
      });
    }

    onUpvote(post) {
      this.postService.upvote(post)
          .then(postGuardado => this.post = postGuardado)
          .catch(e => console.log(e));
    }

}

PostDetailComponent.parameters = [
  ActivatedRoute, PostService
]
