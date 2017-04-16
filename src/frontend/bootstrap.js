import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import AppComponent from './app/components/app.component'
import NewProyectComponent from './app/components/newProyect.component'
import PostComponent from './app/components/post.component'
import NewPostComponent from './app/components/newPost.component'
import PostDetailComponent from './app/components/postDetail.component'
import PostListComponent from './app/components/postList.component'
import CommentComponent from './app/components/comment.component'

import { RouterModule } from '@angular/router'

let router = RouterModule.forRoot([
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'proyects/new', component: NewProyectComponent },
  { path: 'noticias', component: PostListComponent },
  { path: 'noticia/:id', component: PostDetailComponent }
], { useHash: true })

@NgModule({
  imports: [ router, BrowserModule, FormsModule, HttpModule ],
  styleUrls: ['./style.css'],
  declarations: [
    NewProyectComponent,
    PostComponent,
    NewPostComponent,
    AppComponent,
    PostDetailComponent,
    PostListComponent,
    CommentComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
