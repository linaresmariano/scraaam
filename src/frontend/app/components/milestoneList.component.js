import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'milestoneList',
	inputs: [ 'proyect' ],
	template: `
		<h1>Milestones</h1>
		<ul>
			<li *ngFor="let item of proyect.milestones">
				<a [routerLink]="['/proyects', proyect._id, 'milestones', item._id]">{{item.name}}</a>
			</li>
		</ul>
		<newMilestone [proyect]="proyect"></newMilestone>`
})

export default class MilestoneListComponent {
}
