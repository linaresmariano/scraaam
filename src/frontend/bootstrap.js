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
import TaskListComponent from './app/components/taskList.component'
import NewTaskComponent from './app/components/newTask.component'
import TaskDetailComponent from './app/components/taskDetail.component'

import { RouterModule } from '@angular/router'
import {ModalModule} from "ngx-modal"


let router = RouterModule.forRoot([
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'proyects/new', component: NewProyectComponent },
	{ path: 'proyects/:id', component: ProyectDetailComponent },
	{ path: 'proyects/:proyect/milestones/:milestone', component: MilestoneDetailComponent },
	{ path: 'proyects/:proyect/milestones/:milestone/epics/:epic', component: EpicDetailComponent },
	{ path: 'proyects/:proyect/milestones/:milestone/epics/:epic/tasks/:task', component: TaskDetailComponent }
], { useHash: true })

@NgModule({
	imports: [ router, BrowserModule, FormsModule, HttpModule, ModalModule ],
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
		NewCommentComponent,
		TaskListComponent,
		NewTaskComponent,
		TaskDetailComponent
	],
	bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
