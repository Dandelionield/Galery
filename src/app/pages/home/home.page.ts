import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { PictureService } from '@core/services/picture/picture.service';
import { Picture } from '@core/services/picture/entity/picture.entity';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage implements OnInit{

	public pictures: Array<Picture> = [];

	public constructor(

		private swalService: SwalService,
		private loadingService: LoadingService,
		private pictureService: PictureService

	) {}

	public ngOnInit(): void {

		this.loadingService.show();
		this.loadGalery();

	}

	private loadGalery(): void{

		this.pictureService.findAll().subscribe({

			next: (t) => {

				this.pictures = t;
				this.loadingService.hide();

			}, error: (e) => this.swalService.showException('Error', e.message)

		});

	}

}
