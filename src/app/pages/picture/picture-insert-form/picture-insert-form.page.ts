import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { PictureService } from '@core/services/picture/picture.service';
import { BucketFileService } from '@core/services/bucket-file/bucket-file.service';
import { Picture } from '@core/services/picture/entity/picture.entity';
import { BucketFile } from '@core/services/bucket-file/entity/bucket-file.entity';
import { Timestamp } from '@angular/fire/firestore';

@Component({

	selector: 'app-picture-insert-form',
	templateUrl: './picture-insert-form.page.html',
	styleUrls: ['./picture-insert-form.page.scss'],
	standalone: false

}) export class PictureInsertFormPage implements OnInit {

	public imagePreview?: string;
	public selectedFile?: File | Blob;
	public form: FormGroup;

	public constructor(

		private fb: FormBuilder,
		private swalService: SwalService,
		private loadingService: LoadingService,
		private pictureService: PictureService,
		private bucketFileService: BucketFileService

	) {

		this.form = this.fb.group({
			name: ['', [
				Validators.required,
				Validators.maxLength(50),
				Validators.pattern(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]*$/)
			]],
			description: ['', [
				Validators.required,
				Validators.maxLength(200)
			]]
		});

	}

	public ngOnInit(): void {}

	public get name() {

		return this.form.get('name');

	}

	public get description() {

		return this.form.get('description');

	}

	public async selectImage() {

		try {

			const image = await Camera.getPhoto({

				quality: 90,
				allowEditing: true,
				resultType: CameraResultType.Uri

			});

			this.imagePreview = image.webPath;
			this.selectedFile = await fetch(image.webPath!).then(r => r.blob());

		}catch (e: any){

			this.swalService.showException('404', e.message);

		}finally{

			this.loadingService.hide();

		}

	}

	public isFormValid(): boolean {

		return this.form.valid && !!this.selectedFile;

	}

	public async onSubmit(): Promise<void> {

		if (!this.isFormValid()) return;

		try {

			this.loadingService.show();

			const fileName = `${Date.now()}_${(this.selectedFile! as File).name}`;
			const bucketFile = await this.bucketFileService.insert({
				name: fileName,
				file: this.selectedFile!
			});

			const newPicture: Picture = {

				url: bucketFile,
				name: this.form.value.name.trim(),
				description: this.form.value.description.trim(),
				createdAt: Timestamp.now()

			};

			await this.pictureService.insert(newPicture);

			this.resetForm();

		}catch (e: any){

			this.swalService.showException('404', e.message);

		}finally{

			this.loadingService.hide();

		}

	}

	public getNameError(): string {

		if (this.name?.hasError('required')) {

			return 'Name paramether is required';

		}

		if (this.name?.hasError('maxlength')) {

			return '50 characters at max';

		}

		if (this.name?.hasError('pattern')) {

			return 'Only letters, numbers and spaces';

		}

		return '';

	}

	public getDescriptionError(): string {

		if (this.description?.hasError('required')) {

			return 'Description is require';

		}

		if (this.description?.hasError('maxlength')) {

			return '200 characters at max';

		}

		return '';

	}

	private resetForm() {

		this.imagePreview = undefined;
		this.selectedFile = undefined;
		this.form.reset();

	}

}