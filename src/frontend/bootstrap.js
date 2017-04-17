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
import ProyectDetailComponent from './app/components/proyectDetail.component'
import MilestoneComponent from './app/components/milestone.component'
import MilestoneListComponent from './app/components/milestoneList.component'
import NewMilestoneComponent from './app/components/newMilestone.component'
import MilestoneDetailComponent from './app/components/milestoneDetail.component'
import CommentComponent from './app/components/comment.component'
import EpicListComponent from './app/components/epicList.component'
import NewEpicComponent from './app/components/newEpic.component'
import EpicDetailComponent from './app/components/epicDetail.component'
import NewCommentComponent from './app/components/newComment.component'

import { RouterModule } from '@angular/router'

let router = RouterModule.forRoot([
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'proyects/new', component: NewProyectComponent },
	{ path: 'proyects/:id', component: ProyectDetailComponent },
	{ path: 'proyects/:proyect/milestones/:milestone', component: MilestoneDetailComponent },
	{ path: 'proyects/:proyect/milestones/:milestone/epics/:epic', component: EpicDetailComponent }
], { useHash: true })

@NgModule({
	imports: [ router, BrowserModule, FormsModule, HttpModule ],
	styleUrls: ['./style.css'],
	declarations: [
		NewProyectComponent,
		ProyectDetailComponent,
		MilestoneComponent,
		MilestoneListComponent,
		NewMilestoneComponent,
		MilestoneDetailComponent,
		AppComponent,
		CommentComponent,
		EpicListComponent,
		NewEpicComponent,
		EpicDetailComponent,
		NewCommentComponent
	],
	bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
