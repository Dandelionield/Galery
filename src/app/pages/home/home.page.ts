import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { PictureService } from '@core/services/picture/picture.service';
import { BucketFileService } from '@core/services/bucket-file/bucket-file.service';
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
		private pictureService: PictureService,
		private bucketFileService: BucketFileService,
		private router: Router

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

		/*this.bucketFileService.findAll().subscribe({

			next: (t) => {

				console.log(t);

			}, error: (e) => this.swalService.showException('Error', e.message)

		});/**/

	}

	public navigateToInsert(): void {

		this.router.navigate(['/add']);

	}

	public navigateToUpdate(id: string | undefined): void {

		this.router.navigate(['/update', id as string]);

	}

}
