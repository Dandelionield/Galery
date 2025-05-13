import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { PictureService } from '@core/services/picture/picture.service';
import { Picture } from '@core/services/picture/entity/picture.entity';
import { Timestamp } from '@angular/fire/firestore';
import { SweetAlertResult } from 'sweetalert2';

@Component({

	selector: 'app-picture-update-form',
	templateUrl: './picture-update-form.page.html',
	styleUrls: ['./picture-update-form.page.scss'],
	standalone: false

}) export class PictureUpdateFormPage implements OnInit {

	public picture!: Picture;
	public form: FormGroup;

	public constructor(

		private fb: FormBuilder,
		private router: Router,
		private activeRouter: ActivatedRoute,
		private swalService: SwalService,
		private loadingService: LoadingService,
		private pictureService: PictureService

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

	public ngOnInit(): void {

		this.loadingService.show();

		this.loadPicture();

	}

	public get name() {

		return this.form.get('name');

	}

	public get description() {

		return this.form.get('description');

	}

	public async onSubmit(): Promise<void> {

		if (this.form.invalid) return;

		try {

			this.loadingService.show();
			
			const pic: Partial<Picture> = {

				name: this.form.value.name.trim(),
				description: this.form.value.description.trim()

			};

			let success: boolean = await this.pictureService.update(this.picture.id as string, pic);

			if (!success){

				this.swalService.showException('Error', 'Unable to update');

			}else{

				this.router.navigate(['/home']);

			}
			
		} catch (e: any) {

			this.swalService.showException('Error', e.message);

		}finally{

			this.loadingService.hide();

		}

	}

	public async onDelete(): Promise<void>{

		let shot: SweetAlertResult = await this.swalService.getConfirmation('Question', 'Are you sure you want to delete this picture?');

		if (shot.isConfirmed){

			await this.delete();

		}

	}

	private async delete(): Promise<void>{

		try {

			this.loadingService.show();
			
			let success: boolean = await this.pictureService.delete(this.picture.id as string);

			if (!success){

				this.swalService.showException('Error', 'Unable to delete');

			}else{

				this.router.navigate(['/home']);

			}

		} catch (e: any) {

			this.swalService.showException('Error', e.message);

		}finally{

			this.loadingService.hide();

		}

	}

	private async loadPicture(): Promise<void> {

		try{

			let id: string = this.activeRouter.snapshot.paramMap.get('id') as string;

			let pic: Picture | undefined = await this.pictureService.findOne(id);

			if (pic) {

				this.picture = {

					id: id,
					...pic

				};

				this.loadForm();

			}

		}catch(e: any){

			this.swalService.showException('Error', e.message);

		}finally{

			this.loadingService.hide();

		}

	}

	private loadForm(): void {

		this.form.patchValue({

			name: this.picture.name,
			description: this.picture.description,

		});

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

}