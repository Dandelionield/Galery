import { Component, OnInit, Input } from '@angular/core';
import { Picture } from '@core/services/picture/entity/picture.entity';
import { Router } from '@angular/router';

@Component({

	selector: 'app-picture-frame',
	templateUrl: './picture-frame.component.html',
	styleUrls: ['./picture-frame.component.scss'],
	standalone: false

}) export class PictureFrameComponent implements OnInit {

	@Input() public picture!: Picture;

	public constructor(private router: Router) {}

	public ngOnInit(): void {}

}