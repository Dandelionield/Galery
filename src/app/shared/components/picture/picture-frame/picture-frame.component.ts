import { Component, OnInit, Input } from '@angular/core';
import { Picture } from '@core/services/picture/entity/picture.entity';

@Component({

	selector: 'app-picture-frame',
	templateUrl: './picture-frame.component.html',
	styleUrls: ['./picture-frame.component.scss'],
	standalone: false

}) export class PictureFrameComponent implements OnInit {

	@Input() public picture!: Picture;

	public constructor() {}

	public ngOnInit(): void {}

}