import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({

	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: false

}) export class HeaderComponent implements OnInit, OnDestroy {

	@Input() public title: string = 'Galery';
	@Input() public showBackButton: boolean = false;

	public constructor(

		private router: Router,
		private location: Location

	) {}

	public ngOnInit(): void {}

	public ngOnDestroy(): void {}

	public goBack(): void{

		this.location.back();

	}

}